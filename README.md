# Online Voting System

The Online Voting System is a web-based application that allows users to cast their votes securely from anywhere.  
It helps improve voter participation by removing the need to visit physical polling booths.

## Project Objective
- Allow users to vote online in a simple and secure way  
- Reduce manual work and speed up vote counting  
- Ensure that each user can vote only once  

## Features
- User login and registration (Admin & Voter)
- Secure authentication using JWT
- Admin can add, update, and manage candidates
- Voters can view candidates and cast a single vote
- Automatic vote counting and result display

## Tech Stack
- Frontend: React.js, CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT, bcryptjs

## System Roles
- **Admin**: Manages candidates, starts and ends elections, views results
- **Voter**: Logs in, views candidates, and casts vote

## How to Run the Project
1. Clone the repository
2. Install dependencies using `npm install`
3. Start backend and frontend servers
4. Open the application in a web browser

Setups to setup:
-> Backend Setup
- Install Backend Dependencies
    - cd backend
    - npm install

- Create .env File
- Create a file named .env inside the backend folder.

    - Use .env.example as reference:
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=5000 

-> Database Setup
- Restore MongoDB Dump
- mongorestore --db mydb ./db-backup/mydb

-> Frontend Setup
    - cd ../frontend
    - npm install

-> Run project:
- cd backend && npm run dev OR node server.js
- cd frontend && npm run dev OR npm server.js
