import express from 'express';
import { getUserProfile, updateUserProfile, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

// Get user profile
router.get('/:id', getUserProfile);

// Update user profile
router.put('/:id', updateUserProfile);

// Delete user
router.delete('/:id', deleteUser);

export default router;