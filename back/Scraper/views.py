from .models import JobListings
from .serializers import JobListingSerializer
from bs4 import BeautifulSoup
import requests
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

@api_view(['GET', 'POST'])
def get_or_create_job_listings(request):
    if (request.method == 'GET'):
        jobs = JobListings.objects.all()
        serializer = JobListingSerializer(jobs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK, content_type='application/json')
    elif (request.method == 'POST'):
        job_data = JSONParser().parse(request)
        job_serializer = JobListingSerializer(data=job_data)
        if job_serializer.is_valid():
            job_serializer.save()
            return JsonResponse(job_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(job_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def scrape_and_create_job(request):
    if request.method == 'POST':
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

        page = requests.get("https://github.com/SimplifyJobs/Summer2024-Internships")
        soup = BeautifulSoup(page.content, 'html.parser')
        job_listings = []
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
            requires_sponsorship=False

            #check if requires sponsorship
            job_title = cols[1].get_text(strip=True)
            if "🛂" in job_title:
                requires_sponsorship=True

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

                
            job_listings.append({
                "company": company,
                "company_link":final_company_link,
                "title": job_title,
                "location": location,
                "apply_link": apply_link,
                "date": date,
                "closed": is_closed,
                "requires_sponsorship": requires_sponsorship,
                "categories": categories
    })
        # List to keep track of failed creations
        failed_creations = []
        
        # Save the scraped data as new job listings
        for job in job_listings:
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

        # Return a JsonResponse with the number of successful and failed creations
        if not failed_creations:
            return JsonResponse({"message": "All job listings created successfully."}, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse({"message": f"{len(failed_creations)} job listings failed to be created.", "details": failed_creations}, status=status.HTTP_400_BAD_REQUEST)