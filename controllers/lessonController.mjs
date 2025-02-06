import { generateLesson } from '../services/openaiServices.mjs';
import logger from '../utils/logger.mjs';


// Generate a lesson
export const generateContent = async (req, res) => {
    const {language, level, type, translation} = req.body;
    try{
        const lesson = await generateLesson(language, level,type, translation);
        logger.info('Lesson generation request received'); // Test Winston logging
        res.status(200).json({lesson});
    }catch(error){
        logger.error(error.message);
        res.status(500).json({error: error.message});
    }
};

