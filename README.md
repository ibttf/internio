# Internio

Internio is a full-stack web scraping application designed to help job seekers find the latest new grad positions and internships. By scraping various GitHub repositories, Internio compiles a comprehensive list of opportunities and provides an email subscription service to notify users of these new listings in real time.

Deployed on: [Internio]](https://internio.vercel.app/)

## Features

- Real-time Job Listings: Internio continuously scrapes GitHub repositories to provide the latest job listings, ensuring users don't miss out on new opportunities.
- Email Subscription: Users can subscribe to receive email notifications, keeping them informed of new postings without having to manually check the platform.
- Company Insights: Integrated with the Clearbit API to provide additional details about companies, including company information and logos.
- Responsive Design: Built for a seamless experience across desktop and mobile devices.

## Technologies Used
- Frontend: NextJS with Typescript
- Backend: Django
- Database: Postgres
- Asynchronous Tasks: Celery with Redis
- Web Scraping: BeautifulSoup
- Containerization: Docker
- Deployment: AWS EC2
- Web Server: Nginx
- Other Integrations: Clearbit API for company details


## Getting Started

To get started with Internio, follow these steps:

1. Clone the repository
2. Install dependencies with `npm install`
3. Go to the frontend with `cd frontend`
4. Run the frontend with `bun run dev`
5. In a new terminal, open the backend with `cd backend`
6. Run the development server with `python manage.py runserver`

## Usage

Internio scrapes job postings from the following GitHub repositories:

- [https://github.com/SimplifyJobs/Summer2024-Internships](https://github.com/SimplifyJobs/Summer2024-Internships)

To subscribe to email notifications, visit the Internio website and enter your email address.

## Future Enhancements
- User Profiles: Allow users to create profiles to save job listings of interest.
- Filtering & Search: Implement advanced filtering options for users to narrow down job listings based on criteria like location, job type, or company.
- Analytics: Track the most popular job listings and provide insights on trending opportunities.
