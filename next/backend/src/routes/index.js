// routes/index.js
import express from 'express';
import authRoutes from './auth/authRoutes.js';
import userRoutes from './auth/userRoutes.js';
import userInfoRoutes from './user/userInfoRoutes.js';
import contactInfoRoutes from './user/contactInfoRoutes.js';

const router = express.Router();

// Register all routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/userinfo', userInfoRoutes);
router.use('/contact', contactInfoRoutes);

export default router;
