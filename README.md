"Online_Voting_System"


After installing zip folder then extract this folder and then do:

-> Backend Setup
Install Backend Dependencies
    cd backend
    npm install

Create .env File
Create a file named .env inside the backend folder.

Use .env.example as reference:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000 

-> Database Setup
Restore MongoDB Dump
mongorestore --db mydb ./db-backup/mydb

-> Frontend Setup
    cd ../frontend
    npm install

-> Run project:
cd backend && npm run dev OR node server.js
cd frontend && npm run dev OR npm server.js
