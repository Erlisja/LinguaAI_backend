import express from 'express';
import { createUser, getUsers } from '../controllers/userController.mjs';

const router = express.Router();
// Create a new user
router.post('/register', createUser);
// Get all users
router.get('/users', getUsers);


export default router;
