from bs4 import BeautifulSoup
import requests


url = "https://github.com/SimplifyJobs/Summer2024-Internships"
response = requests.get(url)
html_content = response.content


soup = BeautifulSoup(html_content, 'html.parser')

jobs = [""]

table = soup.find('table')
tbody = table.find('tbody')

if tbody:
    jobs = tbody.find_all('tr')


    for job in jobs:
        job_elements = job.find_all('td')
        i = 0
        for element in job_elements:
            
            if(i == 0):
                print("Company: " + element.text)
            if(i == 1):
                print("Job: " + element.text)
            if(i == 2):
                print("Location: " + element.text)
            if(i == 3):
                URLelement = element.find('a')
                
                if URLelement is not None:
                    jobLink = URLelement.get('href')
                    if jobLink is not None:
                        print("URL to apply: " + jobLink)
                    else:
                        print("No link found for this job")
            if(i == 4):
                print("Date: " + element.text)
            i = i + 1
        print("\n")

            










