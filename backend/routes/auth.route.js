import express from 'express';
import { signup, login, logout } from '../controller/auth.controller.js';



import { refreshAccessToken } from '../controller/refreshToken.js';
import authMiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logout);


router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'You are authenticated', user: req.user });
});

export default router;
