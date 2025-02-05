import express from 'express';
import db from './database/connection.mjs';
import dotenv from 'dotenv';
import cors from 'cors';
// load environment variables
dotenv.config();
// create express app
const app = express();
// connect to database
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(cors());
app.use(express.json());


// Test route 
app.get('/', (req, res) => {
  res.send(`Server is running on port ${PORT}`);
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});