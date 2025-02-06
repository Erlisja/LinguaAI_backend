import express from 'express';
import { generateLesson } from '../services/openaiServices.mjs';

const router = express.Router();

// Generate a lesson
router.post('/generate-lesson', async (req, res) => {
    const {language, level, type, translation} = req.body;
    try{
        const lesson = await generateLesson(language, level,type, translation);
        res.status(200).json({lesson});
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

export default router;