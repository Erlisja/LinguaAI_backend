import express from 'express';
import { createUser,loginUser, guestUser } from '../controllers/userController.mjs';
import { body } from "express-validator";

const router = express.Router();
// Create a new user
router.post('/register',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('email').isEmail().withMessage('Please enter a valid email address'),
        body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
    ],
    createUser
     );
// Login a user
router.post('/login',
    [
        body('email').isEmail().withMessage('Please enter a valid email address'),
        body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
    ],
    loginUser
     );

// Guest user
router.post('/guest', guestUser);

    



export default router;
