# Simple ATS

Simple ATS is an applicant tracking system with a job listings page.

## Features
Applicant side: a landing page, job listings page, and pages for each job listing that are generated from markdown.  
Company side: View applicants, access form data, add notes and ratings, create new job listings.

## Installation
This is a template repository so just click the "Use this template" button!

## Usage
This project uses a MongoDB database. Create your own database and then fill out the environment variables with the following:
- DB_URL= `Your database connection url here`
- JWT_SECRET= `Your jwt secret here`
- URL= `Your hosted url here`

For demo purposes the api is unprotected. Protecting your api is highly recommended.  
The signup route is also unprotected, you should secure this route in production.

## Demo
The demo is available at https://ats.demos.baykam.me/.  
To access the applicant tracking system visit https://ats.demos.baykam.me/ats.

## Contributing
Pull requests are welcome.

## License
[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
