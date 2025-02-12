import express from 'express';
import { createUser,loginUser, guestUser } from '../controllers/userController.mjs';
import { body } from "express-validator";

const router = express.Router();
// Create a new user
router.post('/register',createUser);
// Login a user
router.post('/login',loginUser);

// Guest user
router.get('/guest', guestUser);

    



export default router;
