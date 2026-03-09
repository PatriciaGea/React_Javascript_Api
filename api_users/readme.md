# User API – CRUD with Node.js and MongoDB

Patricia Gea Rodrigues, FED27 Hyper Island, S8 Web API communicating with HTTP Assignment

This project is a REST API that allows creating, reading, updating, and deleting users.

It was built using Node.js, Express, and MongoDB Atlas with Mongoose.

The server runs locally, but the database is hosted online.  
In this project, I chose to use **Mongoose** instead of the native MongoDB client because it allows me to create a centralized model schema for the user data.  
This makes the code easier to understand, organized, and it is a scalable solution for building this API.

---

## This API manages user records with the following information:

- name  
- email  
- createdAt  

### HTTP methods

- GET → `/users`, `/users/:id`  
- POST → `/users`  
- PUT → `/users/:id`  
- DELETE → `/users/:id`  

### HTTP status codes

- 200 OK  
- 201 Created  
- 400 Bad Request  
- 404 Not Found  
- 409 Conflict  
- 500 Internal Server Error  

---

## Endpoints

- POST `/users`  
- GET `/users`  
- GET `/users/:id`  
- PUT `/users/:id`  
- DELETE `/users/:id`  

---

## How to run the project

### 1. Clone the repository

Terminal:  
git clone https://github.com/PatriciaGea/api_users.git

cd api_users

### 2. Install dependencies

Terminal:  
npm install

### 3. Start the server

Terminal:  
node server.js

### 4. Test the API

Example for creating a user:

- Method: POST  
- URL: `http://localhost:3000/users`  
- Headers: `Content-Type: application/json`  
- Body → raw → JSON:

{
  "name": "Patricia Gea456",
  "email": "patriciagea456@email.com"
}

---

## Environment variables

For this school assignment, the `.env` file is included in the repository  
to make easier to run and test the API locally.

The file contains the MongoDB Atlas connection string used by the project
This is done only for educational purposes. In a real production environment, the `.env` file would not be committed to the repository.

---

## Project structure

api_users  
│  
├── server.js        // starts the server  
├── db.js            // connects to MongoDB  
├── routes  
│   └── users.js     // user routes  
├── models  
│   └── user.js      // user model  
├── .env  
├── package.json  

### Project structure explanation

The project is separated into different files:

- `server.js` is responsible for starting the server and loading the application.  
- `db.js` handles the connection to the MongoDB database.  
- `routes/users.js` contains all the routes related to users (GET, POST, PUT, DELETE).  
  If the project grows, new route files can be added, for example `products.js` or `orders.js`, keeping each feature separated and the code easier to organize, scale, and maintain.  
- `models/user.js` defines the structure of the user data using Mongoose (the schema).  
  Using a schema is considered best practice because it enforces consistency for the data, makes it easier to validate fields, and keeps the code organized.  
  This is more professional and helps when the project grows or when multiple people work on the same code.  

This separation is a good practice because it makes the code cleaner, easier to maintain, and easier to scale as the project grows.
