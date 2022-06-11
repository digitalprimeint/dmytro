### INTERVIEW TEST REQUIREMENT

Create a small microservice-based application on the Google Cloud Platform. The application is an API that returns a list of coffee drinks, roasts, or recipes (anything about coffee) to the user of the API. It needs to have the following components and functionality:

- #### Proxy service
    - Needs to check for valid AUTH credentials in the request
    - If credentials are valid, redirect to the API-gateway
    - Each user of the API may only do 10 requests per minute - rate limiting
    - Should only be available to users located in Canada and Panama regions - geo fence

- #### API-gateway
    - Can only be accessed from Proxy
    - Then redirects to the appropriate micro-service based on URL structure

- #### Coffee service
    - REST or GraphQL API that returns a list of coffee drinks, recipes, sorts, roasts, or anything like that
    - The coffee data can be scraped from the web, saved in DB, or used from any third-party API - up to you
    - Regardless of the API standards used, the data must be filterable and sortable (ideally searchable)

#### General requirements:

- Submission: public GitHub repository(s)
    - Must be properly structured including README, branches, and good structure and usage of pull requests
- Deadline: Monday, June 13th at 10 am EDT
- Other requirements:
    - Architecture must be built in a way where it will be easy to add more drinks microservices later in the future (ex. wine,  tea, etc.)
    - You can use either VM or Serverless
    - Must be built entirely on the Google Cloud Platform. Note that all candidates receiving this assignment have limited or no knowledge of GCP. Hence, with this requirement, we will be testing how fast you can learn and adapt new concepts and technology.
- Extras:
    - If you think of any other ways to enhance the architecture structure or functionality - feel free to do so. Your creative freedom is not limited here. Just make sure your app corresponds to the requirements listed above. 
    - Extra points will be given if a postman collection is submitted in the repository too