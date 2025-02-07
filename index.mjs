import express from 'express';
import db from './database/connection.mjs';
import dotenv from 'dotenv';
import cors from 'cors';
import httpLogger from './middleware/loggingMiddleware.mjs';
import logger from './utils/logger.mjs';
import userRoutes from './routes/userRoutes.mjs';
import lessonRoutes from './routes/lessonRoutes.mjs';
import { errorHandler } from './utils/errorHandler.mjs';
import passport from 'passport';
import './config/passportConfig.mjs';
import goolgeAuthUserRoutes from './routes/googleAuthUserRoutes.mjs';

// load environment variables
dotenv.config();
// create express app
const app = express();
// connect to database
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Middleware
app.use(httpLogger);
app.use(cors());
app.use(express.json());

// Initialize passport
app.use(passport.initialize());
// Test route 
app.get('/', (req, res) => {
  res.send(`Server is running on port ${PORT}`);
});

// Import routes
app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);

app.use('/api/users', userRoutes);
app.use('/api/users/', goolgeAuthUserRoutes);




// Error handler middleware
app.use(errorHandler);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);

});