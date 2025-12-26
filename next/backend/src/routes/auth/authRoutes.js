import express from 'express';
import { register, login, requestPasswordReset, resetPassword } from '../../controllers/authController/authController.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/password-reset', requestPasswordReset);
router.post('/password-reset/:token', resetPassword);

export default router;
