# Total-Life-Test-App

Test App for the Total Life interview

# Background

Given 4-5 hours maximum complete the following code project.

Project Part 1. Backend Development

Objective: Create a simple REST API using a framework of your choice. We recommend Node.js/Express or a Python backend. The application you are building is an internal tool used to manage patients and their appointments.

Requirements:

1. Design a clinician, patient, and an appointments table.
   o Try to select a few fields that might be useful in the context.
   o Setup relevant relationships between the two resources.
2. Implement endpoints to create, read, update, and delete for all resources.
3. Use an SQLlite database to store the data.
4. Validate incoming request data.
5. Be sure to include an NPI number in the clinician table.
   o An NPI number is a unique identification number for covered health care providers in the US.
   o When a new clinician is added onto the system, we will want to validate the NPI number, and check the clinicians first and last name, as well as their state using the https://npiregistry.cms.hhs.gov/api-page API.

Project Part 2. Frontend Development

Objective: Create a simple frontend web app (ie. React app) that fetches and displays a list of appointments from the API in part 1.

Requirements:

1. Display appointments in a list, showing the patient’s name, appointment time, and appointment status.
2. Implement a time range filter.
3. Style the application using any minimal styling framework (Tailwind CSS etc.)
4. You must be able to demonstrate a working list by leveraging the backend in part 1a and populating it with data.

Evaluation Criteria:

1. Code quality and readability.
2. Correct use of state management.
3. Implementation of APIs for data fetching.
4. Ability to organize a basic UI to display the information.
5. Low priority: styling

# Setup

Make sure node.js and npm are installed and call `npm i` in the root and `/client/` directories.

# Running the App

In the root directory, call `node server/index.js`. Once the server is running on port 3001,
move to the `/client` directory and run `npm run start` to start the client. If no browser
window opens automatically, open one and navigate to `http://localhost:3000/` to see the webpage.
