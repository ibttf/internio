
from celery import shared_task
from django.http import JsonResponse
from rest_framework import status
import requests
from bs4 import BeautifulSoup
import re
import os
from .models import JobListings
from .serializers import JobListingSerializer

@shared_task
def scrape_and_create_job():
        
        #SCRAPING FROM SIMPLIFY
        word_categories={
        "intern": "Internship",
        "co-op": "Co-op",
        "machine learning": "Machine Learning",
        "ml": "Machine Learning",
        "artifical intelligence": "Machine Learning",
        "software": "Software Engineering",
        "data": "Data Science",
        "research": "Research",
        }

        # Dictionary for abbreviations

        page = requests.get("https://github.com/SimplifyJobs/Summer2024-Internships")
        soup = BeautifulSoup(page.content, 'html.parser')
        job_listings = []
        company_map={}
        # List to keep track of failed creations
        failed_creations = []
        
        for row in soup.find_all('tr'):
            cols = row.find_all('td')


            
            # Ensure there are at least 5 columns (Company, Job Title, Location, Apply Link, Date)
            if len(cols) < 5:
                continue


            #BEFORE DOING ANYTHING, CHECK IF WE'VE SEEN THIS BEFORE

            
            #CLOSED HANDLING
            is_closed=False
            if "🔒" in cols[3].get_text(strip=True):
                is_closed=True
            # APPLY LINK HANDLING
            apply_link_tag = cols[3].find('a', rel='nofollow')
            if apply_link_tag:
                apply_link = apply_link_tag['href']
            else:
                apply_link = None
                is_closed=True #should've been accounted for earlier, but just in case it's not already done, then check if closed.



            # COMPANY NAME HANDLING
            company = cols[0].get_text(strip=True)

            #JOB TITLE HANDLING
            #check if requires sponsorship
            job_title = cols[1].get_text(strip=True)
            company_requires_sponsorship=False


            #CATEGORIES HANDLING
            categories=[]
            for key in word_categories:
                if key in job_title.lower():
                    categories.append(word_categories[key])
                    





            if "🛂" in job_title:
                # this line of code isn't working for some reason. It's not reupdating the value of the company_requires_sponsorship variable.
                job_title=job_title.replace("🛂","")
                company_requires_sponsorship=True

            existing_job = JobListings.objects.filter(apply_link=apply_link).first()
            if existing_job:
                # The job already exists.
                updated = False  # Flag to check if an update is needed

                # Check if there is any change in the application status
                if is_closed != existing_job.closed:
                    existing_job.closed = is_closed
                    updated = True

                # Check if there is any change in the sponsorship status and change
                if company_requires_sponsorship != existing_job.sponsorship:
                    existing_job.sponsorship = company_requires_sponsorship
                    updated = True

                # Save only once if any updates were made
                if updated:
                    existing_job.save()




            #LOCATIONS HANDLING
            location = cols[2].get_text(strip=True)
            addons=[]
            if "Remote in USA" in location:
                location=location.replace("Remote in USA","")
                addons.append("Remote in USA")
            
            if "Remote" in location:
                location=location.replace("Remote","")
                addons.append("Remote")
            
            # Handle special cases  
            if ("NYC Metro, NY" not in location) and ("NYC" in location):
                location = location.replace("NYC", "New York City, NY")
            elif ("NYC Metro, NY" in location):
                location = location.replace("NYC Metro, NY", "New York City Metro Area, NY")

            location = location.replace("SF", "San Francisco, CA")
            location = location.replace("LA", "Los Angeles, CA")

            # Handle 'XX locations' prefix
            location = re.sub(r'^\d+\slocations', '', location).strip()

            # Use regex to find all matches that fit the city-state format
            locations = re.findall(r'([A-Za-z\s]+,?\s?[A-Z]{2})', location)
            
            # Further filter and clean the results
            cleaned_locs = [loc.strip() for loc in locations if not re.search(r'\d', loc)]
            cleaned_locs= cleaned_locs + addons
            final_locations=list(set(cleaned_locs))





            #DATE HANDLING
            date = cols[4].get_text(strip=True)

            


            #ERROR HANDLING: if company name is empty, then add company name and link from the last available one
            if "↳" in company:
                i=-1
                while ("↳" in job_listings[-1]["company"]):
                    i-=1
                company=job_listings[i]["company"]

            job={
                "company": company,
                "apply_link": apply_link,
            }
            job_listings.append(job)

            existing_company=JobListings.objects.filter(company=job['company']).first()
            if not existing_job:
                # We've never seen this before, then we'll make a new one, ONLY calling the API here.
                if not existing_company:
                    # If we haven't seen this company before, then we'll add it to the map
                    link = requests.get(f"https://company.clearbit.com/v1/domains/find?name={company}",auth=(os.environ.get('CLEARBIT_KEY'),''))
                    if link.status_code == 200:
                        link_data = link.json()
                        if link_data["domain"] and link_data["logo"]:
                            company_map[company] = {"domain": link_data["domain"], "logo": link_data["logo"]}
                            final_company_link = link_data["domain"]
                            final_company_logo = link_data["logo"]
                        else:
                            # Error getting company link and logo
                            final_company_link = ""
                            final_company_logo = ""
                    else:
                        # Error getting company link and logo
                        final_company_link = ""
                        final_company_logo = ""
                else:
                    # Company exists in our database
                    final_company_link = existing_company.company_link
                    final_company_logo = existing_company.company_logo
                
                job_serializer = JobListingSerializer(data={
                    "company": company,
                    "company_link":final_company_link,
                    "company_logo":final_company_logo,
                    "title": job_title,
                    "locations": final_locations,
                    "apply_link": apply_link,
                    "date": date,
                    "closed": is_closed,
                    "sponsorship": company_requires_sponsorship,
                    "categories": categories
                })
                if job_serializer.is_valid():
                    job_serializer.save()
                    
                else:
                    # If serialization failed, store the job details for debugging purposes
                    failed_job = {
                        "company": company,
                        "company_link":final_company_link,
                        "company_logo":final_company_logo,
                        "title": job_title,
                        "locations": final_locations,
                        "apply_link": apply_link,
                        "date": date,
                        "closed": is_closed,
                        "sponsorship": company_requires_sponsorship,
                        "categories": categories
                    }
                    failed_job["errors"] = job_serializer.errors
                    failed_creations.append(failed_job)


        # Return a JsonResponse with the number of successful and failed creations
        if not failed_creations:
            return JsonResponse({"message": "All job listings created successfully."}, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse({"message": f"{len(failed_creations)} job listings failed to be created.", "details": failed_creations}, status=status.HTTP_400_BAD_REQUEST)

