# Interview Scheduler

A React single-page application that allows users to book and cancel interviews.
An interactive M-F schedule is used to view and manage interview bookings. The number of spots available is shown on the navigation sidebar.
The user has the option to book, edit, and cancel interviews. 

- Data is persisted by the API server using a PostgreSQL database.
- The client application communicates with an API server over HTTP, using the JSON format.
- Jest tests are used through the development of the project.

## Screenshots

![Booking an interview](https://github.com/A-DUYVESTYN/scheduler/blob/master/docs/scheduler_appointment-form.png?raw=true)

## Setup

Install dependencies with `npm install`.

  React
  Webpack, Babel
  Axios, WebSockets
  Axios
  Storybook, Webpack Dev Server, Jest, Testing Library

  The Scheduler client application created using Create React App[https://facebook.github.io/create-react-app/]. Express [https://expressjs.com/] is the basis for the Scheduler API server application.




## Running Webpack Development Server
A separate API server persists the interview data to a database. the API server must be run separately on a differennt port.

Interview Scheduler API: https://github.com/lighthouse-labs/scheduler-api
Fork and clone the scheduler-api into a new directory (NOT within our current scheduler directory) on your host machine (not in a Vagrant machine).

Follow the README.md instructions. This will involve a few steps, including:

installing dependencies
creating the database
creating a .env.development file in the root directory
seeding the database
running the server

```sh
npm start
```

## Running Client Server


```sh
npm start
```



## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
