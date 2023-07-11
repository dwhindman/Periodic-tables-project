
# Periodic Tables: Restaurant Reservation System

## Summary
This application serves as a restaurant reservation system that allows the restaurant staff the ability to keep track of their reservations while customers can make reservations online. It contains these functionalities.

Customers: Customers can create, edit and delete their reservations online within the business hours of the restaurant.

Staff: Staff are able to view and create tables by ID and capacity. Staff can view, edit, assign and cancel current and future reservations to specific tables that are available as well. For quick navigation, staff are also able to search for reservations by phone number.

## Technology Used
Frontend: JavaScript, React, API calls, HTML, and CSS

Backend: PostgreSQL, Node.js, Express, Knex, and CORS

## Application Link
Frontend: https://periodic-table-project.onrender.com
Backend: https://periodic-tables-project.onrender.com

## Screenshots
Dashboard listing Daily Reservations and Tables along with their status:
![Screenshot (29)](https://github.com/dwhindman/Periodic-tables-project/assets/122843020/aa8540c5-2176-4c58-8033-c512256142f1)

Reservation Form:
![Screenshot (28)](https://github.com/dwhindman/Periodic-tables-project/assets/122843020/54d393f9-cb11-4829-a492-7c6cf32e8270)

Create a new table for guests to sit at:
![Screenshot (31)](https://github.com/dwhindman/Periodic-tables-project/assets/122843020/4dc6b93d-ad32-43d3-9dff-50b4f3fb2c21)

Search for a reservation by phone number:
![Screenshot (30)](https://github.com/dwhindman/Periodic-tables-project/assets/122843020/7b454f9c-2a33-4685-8060-69b93004d394)

Reservations made within business hours:
![Screenshot (32)](https://github.com/dwhindman/Periodic-tables-project/assets/122843020/d8a3895a-e22c-4cfa-8831-ece809b9972f)

## Installation
1. Run 'npm install' in main to install the node packages.
2. Run 'npm run start' to run the front and back ends concurrently, 'npm run start:frontend' for frontend only, 'npm run start:backend' to run backend only.

## Running tests

This project has unit, integration, and end-to-end (e2e) tests. You have seen unit and integration tests in previous projects.
End-to-end tests use browser automation to interact with the application just like the user does.
Once the tests are passing for a given user story, you have implemented the necessary functionality.

Test are split up by user story. You can run the tests for a given user story by running:

`npm run test:X` where `X` is the user story number.

Have a look at the following examples:

- `npm run test:1` runs all the tests for user story 1 (both frontend and backend).
- `npm run test:3:backend` runs only the backend tests for user story 3.
- `npm run test:3:frontend` runs only the frontend tests for user story 3.

Whenever possible, frontend tests will run before backend tests to help you follow outside-in development.

> **Note** When running `npm run test:X` If the frontend tests fail, the tests will stop before running the backend tests. Remember, you can always run `npm run test:X:backend` or `npm run test:X:frontend` to target a specific part of the application.

Since tests take time to run, you might want to consider running only the tests for the user story you're working on at any given time.

Once you have all user stories complete, you can run all the tests using the following commands:

- `npm test` runs _all_ tests.
- `npm run test:backend` runs _all_ backend tests.
- `npm run test:frontend` runs _all_ frontend tests.
- `npm run test:e2e` runs only the end-to-end tests.

If you would like a reminder of which npm scripts are available, run `npm run` to see a list of available commands.

Note that the logging level for the backend is set to `warn` when running tests and `info` otherwise.

> **Note**: After running `npm test`, `npm run test:X`, or `npm run test:e2e` you might see something like the following in the output: `[start:frontend] Assertion failed:`. This is not a failure, it is just the frontend project getting shutdown automatically.

> **Note**: If you are getting a `unable to resolve dependency tree` error when running the frontend tests, run the following command: `npm install --force --prefix front-end`. This will allow you to run the frontend tests.

> **Hint**: If you stop the tests before they finish, it can leave the test database in an unusual state causing the tests to fail unexpectedly the next time you run them. If this happens, delete all tables in the test database, including the `knex_*` tables, and try the tests again.

### US-01 Create and list reservations

As a restaurant manager<br/>
I want to create a new reservation when a customer calls<br/>
so that I know how many customers will arrive at the restaurant on a given day.

### US-02 Create reservation on a future, working date

As a restaurant manager<br/>
I only want to allow reservations to be created on a day when we are open<br/>
so that users do not accidentally create a reservation for days when we are closed.<br/>


### US-03 Create reservation within eligible timeframe

As a restaurant manager<br/>
I only want to allow reservations to be created during business hours, up to 60 minutes before closing<br/>
so that users do not accidentally create a reservation for a time we cannot accommodate.

### US-04 Seat reservation

As a restaurant manager, <br/>
When a customer with an existing reservation arrives at the restaurant<br/>
I want to seat (assign) their reservation to a specific table<br/>
so that I know which tables are occupied and free.

### US-05 Finish an occupied table

As a restaurant manager<br/>
I want to free up an occupied table when the guests leave<br/>
so that I can seat new guests at that table.<br/>

### US-06 Reservation Status

As a restaurant manager<br/>
I want a reservation to have a status of either booked, seated, or finished<br/>
so that I can see which reservation parties are seated, and finished reservations are hidden from the dashboard.

### US-07 Search for a reservation by phone number

As a restaurant manager<br/>
I want to search for a reservation by phone number (partial or complete)<br/>
so that I can quickly access a customer's reservation when they call about their reservation.<br/>

### US-08 Change an existing reservation

As a restaurant manager<br/>
I want to be able to modify a reservation if a customer calls to change or cancel their reservation<br/>
so that reservations are accurate and current.

## Future updates
With more time, I plan on including styling to add a more high-end feel to the website. This website could also be improved by having separate customer and staff functionalities like online ordering for customers or a floorplan of the restaurant for staff with table locations so staff know which reservation is at each table, including how long they have been at each table to help predict when that table may be available for another party.
