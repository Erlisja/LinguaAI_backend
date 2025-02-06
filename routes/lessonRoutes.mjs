import express from 'express';
import { generateContent } from '../controllers/lessonController.mjs';
import validateLesson from '../middleware/lessonValidation.mjs';

const router = express.Router();

// Generate a lesson
router.post('/generate-lesson', validateLesson, generateContent);

export default router;