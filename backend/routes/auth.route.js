import express from 'express';
import { signup, login, logout, refreshAccessToken } from '../controller/auth.controller.js';





import authMiddleware from '../middleware/authmiddleware.js';
import Joi from 'joi';
import { validateBody } from '../middleware/validate.js';

const router = express.Router();

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

router.post('/register', validateBody(authSchema), signup);
router.post('/login', validateBody(authSchema), login);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logout);


router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'You are authenticated', user: req.user });
});

export default router;
