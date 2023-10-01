# READ: VS code is limited to 1000 lines of scroll back in defualt settings, which will not be enough to see all of the output here. I set mine to 2500, now it works fine. 
from bs4 import BeautifulSoup
import requests

#simplify jobs code
url = "https://github.com/SimplifyJobs/Summer2024-Internships"
response = requests.get(url)
html_content = response.content


soup = BeautifulSoup(html_content, 'html.parser')

jobs = [""]
jobsObjects = [] #THIS LIST WILL CONTAIN ALL OF THE JOB OBJECTS THAT WE HAVE CREATED.

table = soup.find('table')
tbody = table.find('tbody')

class JobInformation:
    def __init__(self):
        self.company = ""
        self.job = ""
        self.location = ""
        self.url = ""
        self.date = ""
    def display(self):
        print("Company:", self.company)
        print("Job:", self.job)
        print("Location:", self.location)
        print("URL:", self.url)
        print("Date:", self.date)

if tbody:
    jobs = tbody.find_all('tr')


    for job in jobs:
        job_elements = job.find_all('td')
        i = 0     # generally only 4 text elements within the tables so its fairly straight forward to just loop through them and set our objects variables to the text within the html.
        job_listing = JobInformation()

        for element in job_elements:
            
            if(i == 0):
                job_listing.company = element.text   
            if(i == 1):
                job_listing.job = element.text
            if(i == 2):
                job_listing.location = element.text
            if(i == 3):
                
                URLelement = element.find('a')
                
                if URLelement is not None:
                    jobLink = URLelement.get('href')
                    if jobLink is not None:
                        job_listing.url = jobLink
                        
                    else:
                        print("No link found for this job")
            if(i == 4):
                job_listing.date = element.text
                
            i = i + 1

        jobsObjects.append(job_listing) 

#for jobObject in jobsObjects:
        #jobObject.display() #displaying the information

        #print("\n")

    ####
    ####
    ####

    #scraping from second website. Simply redefine our previous variables to something like "none", or just redefine, and then 
    # redefine them if we need them depending on how the html is formatted. We will still use our job object list and class.
    #Small differences with this website, as it has us citizenship as a table. I'm not going to include this for now as the other website didn't have it. 
    # Probably better to stay consistent with the elements they both have so there's no quirks when printing data.
    

url = "https://github.com/ReaVNaiL/New-Grad-2024" # new url
response = requests.get(url)
html_content = response.content

soup = BeautifulSoup(html_content, 'html.parser') #new soup

jobs = [""]

table = soup.find('table')
tbody = table.find('tbody')

if tbody:
    jobs = tbody.find_all('tr')
    for job in jobs:
        job_listing = JobInformation()
        i = 0

        job_elements = job.find_all('td')
        for element in job_elements:
            if(i == 0):
                job_listing.company = element.text   

                URLelement = element.find('a')
                
                if URLelement is not None:
                    jobLink = URLelement.get('href')
                    if jobLink is not None:
                        job_listing.url = jobLink
                    else:
                        print("No link found for this job")

            if(i == 1):
                job_listing.location = element.text  #if copy pasting anything, be careful here, location and jobs position are swapped compared to the 1st scrape.
            if(i == 2):
                job_listing.job = element.text
            if(i == 4):
                job_listing.date = element.text
                
            i = i + 1
        jobsObjects.append(job_listing) 


    for jobObject in jobsObjects:
        jobObject.display() #displaying the information

        print("\n")

            










