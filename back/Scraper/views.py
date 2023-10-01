from .models import JobListings
from .serializers import JobListingSerializer
from bs4 import BeautifulSoup
import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

@api_view(['GET'])
def get_job_listings(request):
    jobs = JobListings.objects.all()
    serializer = JobListingSerializer(jobs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK, content_type='application/json')
@api_view(['POST'])
def scrape_and_create_job(request):
    # This is just a basic scraping example
    if request.method == 'POST':
        URL = request.data.get('url')
        page = requests.get(URL)
        soup = BeautifulSoup(page.content, 'html.parser')
        
        # Example: assuming the site has job listings in <div class="job-title"> tags
        job_titles = soup.findAll("div", class_="job-title")
        
        for title in job_titles:
            JobListings.objects.create(title=title.text)

        return Response({"message": "Jobs scraped and saved!"}, status=201)