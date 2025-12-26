import express from 'express';
import { getAllUsers, getMe, changeRole, deleteUser } from '../../controllers/authController/userController.js';
import { protect, authorizeRoles } from '../../middleware/authMiddleware.js';
const router = express.Router();

// Get all users (admin only)
router.get('/', protect, authorizeRoles('admin'), getAllUsers);

// Get profile for logged-in user
router.get('/me', protect, getMe);

// Change role (admin only)
router.patch('/:id/role', protect, authorizeRoles('admin'), changeRole);

// Delete user (admin only)
router.delete('/:id', protect, authorizeRoles('admin'), deleteUser);

export default router;
