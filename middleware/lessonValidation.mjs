import { body, validationResult } from "express-validator";

// Allowed values for dropdown fields
const allowedLanguages = ["English", "Spanish", "French", "German", "Italian"]; 
const allowedLevels = ["beginner", "intermediate", "advanced"];
const allowedTypes = ["lesson", "vocabulary", "quiz", "fill_in_the_blank"];
const allowedTranslations = ["English", "Spanish", "French", "German", "Italian", "none","Albanian"]; 

const validateLesson = [
  body("language")
    .trim()
    .notEmpty().withMessage("Language is required")
    .isIn(allowedLanguages).withMessage("Invalid language selection"),

  body("level")
    .trim()
    .notEmpty().withMessage("Level is required")
    .isIn(allowedLevels).withMessage("Invalid level selection"),

  body("type")
    .trim()
    .notEmpty().withMessage("Lesson type is required")
    .isIn(allowedTypes).withMessage("Invalid lesson type selection"),

  body("translation")
    .optional()
    .trim()
    .isIn(allowedTranslations).withMessage("Invalid translation language"),

  // Middleware to handle validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export default validateLesson;
