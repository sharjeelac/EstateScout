import express from 'express';
const router = express.Router();
import { register, login , logout } from '../controllers/auth.controller.js';

// user registration route
router.post('/register', register)

// user login route
router.post('/login', login)

// user logout route
router.post('/logout', logout)

export default router;