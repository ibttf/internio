from .models import JobListings
from .serializers import JobListingSerializer
from bs4 import BeautifulSoup
import re
import requests
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from celery import shared_task

@api_view(['GET', 'POST'])
def get_job_listings(request):
    if request.method == 'GET':
        jobs = JobListings.objects.all()
        serializer = JobListingSerializer(jobs, many=True)


        return Response(serializer.data, status=status.HTTP_200_OK, content_type='application/json')




@shared_task
def scrape_and_create_job():
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

        abbreviations_rev = {
            "Alabama": "AL",
            "Alaska": "AK",
            "Arizona": "AZ",
            "Arkansas": "AR",
            "California": "CA",
            "Colorado": "CO",
            "Connecticut": "CT",
            "Delaware": "DE",
            "Florida": "FL",
            "Georgia": "GA",
            "Hawaii": "HI",
            "Idaho": "ID",
            "Illinois": "IL",
            "Indiana": "IN",
            "Iowa": "IA",
            "Kansas": "KS",
            "Kentucky": "KY",
            "Louisiana": "LA",
            "Maine": "ME",
            "Maryland": "MD",
            "Massachusetts": "MA",
            "Michigan": "MI",
            "Minnesota": "MN",
            "Mississippi": "MS",
            "Missouri": "MO",
            "Montana": "MT",
            "Nebraska": "NE",
            "Nevada": "NV",
            "New Hampshire": "NH",
            "New Jersey": "NJ",
            "New Mexico": "NM",
            "New York": "NY",
            "North Carolina": "NC",
            "North Dakota": "ND",
            "Ohio": "OH",
            "Oklahoma": "OK",
            "Oregon": "OR",
            "Pennsylvania": "PA",
            "Rhode Island": "RI",
            "South Carolina": "SC",
            "South Dakota": "SD",
            "Tennessee": "TN",
            "Texas": "TX",
            "Utah": "UT",
            "Vermont": "VT",
            "Virginia": "VA",
            "Washington": "WA",
            "West Virginia": "WV",
            "Wisconsin": "WI",
            "Wyoming": "WY",
            "District of Columbia": "DC",
            "American Samoa": "AS",
            "Guam": "GU",
            "Northern Mariana Islands": "MP",
            "Puerto Rico": "PR",
            "United States Minor Outlying Islands": "UM",
            "U.S. Virgin Islands": "VI",
        }
        abbreviations = dict(map(reversed, abbreviations_rev.items()))

        page = requests.get("https://github.com/SimplifyJobs/Summer2024-Internships")
        soup = BeautifulSoup(page.content, 'html.parser')
        job_listings = []
        # List to keep track of failed creations
        failed_creations = []
        
        for row in soup.find_all('tr'):
            cols = row.find_all('td')
            
            # Ensure there are at least 5 columns (Company, Job Title, Location, Apply Link, Date)
            if len(cols) < 5:
                continue
            
            # Extract Company Name
            company = cols[0].get_text(strip=True)

            # If the company name is a link, extract the link too
            company_link = cols[0].find('a')
            final_company_link=''
            if company_link:
                final_company_link = company_link['href']
            
            # Extract Job Title, Location, Date
            company_requires_sponsorship=False

            #check if requires sponsorship
            job_title = cols[1].get_text(strip=True)

            if "🛂" in job_title:
                # this line of code isn't working for some reason. It's not reupdating the value of the company_requires_sponsorship variable.
                job_title=job_title.replace("🛂","")
                company_requires_sponsorship=True


            #check categories this belongs to
            categories=[]
            for key in word_categories:
                if key in job_title.lower():
                    categories.append(word_categories[key])
                    

            
            #check if already closed
            is_closed=False
            if "🔒" in cols[3].get_text(strip=True):
                is_closed=True
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




            date = cols[4].get_text(strip=True)

            
            # Extract Apply Link and icons
            apply_link_tag = cols[3].find('a', rel='nofollow')
            if apply_link_tag:
                apply_link = apply_link_tag['href']
            else:
                apply_link = None
                is_closed=True #should've been accounted for earlier, but just in case it's not already done, then check if closed.


            #final error handling: if company name is empty, then add company name and link from the last available one
            if "↳" in company:
                i=-1
                while ("↳" in job_listings[-1]["company"]):
                    i-=1
                company=job_listings[i]["company"]
                company_link=job_listings[i]["company_link"]

            job={
                "company": company,
                "company_link":final_company_link,
                "title": job_title,
                "locations": final_locations,
                "apply_link": apply_link,
                "date": date,
                "closed": is_closed,
                "sponsorship": company_requires_sponsorship,
                "categories": categories
            }
            job_listings.append(job)

            existing_job = JobListings.objects.filter(apply_link=job['apply_link']).first()
            if not existing_job:
                job_serializer = JobListingSerializer(data=job)
                if job_serializer.is_valid():
                    job_serializer.save()
                else:
                    # If serialization failed, store the job details for debugging purposes
                    failed_job = job
                    failed_job["errors"] = job_serializer.errors
                    failed_creations.append(failed_job)
            else:
                # the job already exists. 
                updated = False  # flag to check if an update is needed
                
                # check if there is any change in the application status
                if is_closed != existing_job.closed:
                    existing_job.closed = is_closed
                    updated = True
                    
                # check if there is any change in the sponsorship status and change
                if company_requires_sponsorship != existing_job.sponsorship:
                    existing_job.sponsorship = company_requires_sponsorship
                    updated = True

                # Save only once if any updates were made
                if updated:
                    existing_job.save()

        # Return a JsonResponse with the number of successful and failed creations
        if not failed_creations:
            return JsonResponse({"message": "All job listings created successfully."}, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse({"message": f"{len(failed_creations)} job listings failed to be created.", "details": failed_creations}, status=status.HTTP_400_BAD_REQUEST)





