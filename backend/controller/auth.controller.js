import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { signupSchema, loginSchema } from '../validators/authValidation.js';
import ApiError from '../utils/ApiError.js';

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

export const signup = async (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) return next(new ApiError(error.details[0].message, 400));

  const { email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return next(new ApiError('Email already registered', 400));

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    const tokens = generateTokens(newUser._id);

    
    res
      .cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 
      })
      .status(201)
      .json({
        user: { id: newUser._id, email: newUser.email },
        accessToken: tokens.accessToken
      });
  } catch (err) {
    next(err); 
  }
};

export const login = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return next(new ApiError(error.details[0].message, 400));

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return next(new ApiError('Invalid credentials', 400));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ApiError('Invalid credentials', 400));

    const tokens = generateTokens(user._id);

    
    res
      .cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 
      })
      .json({
        user: { id: user._id, email: user.email },
        accessToken: tokens.accessToken
      });
  } catch (err) {
    next(err); 
  }
};

export const logout = (req, res) => {
  
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict'
  });
  res.json({ message: 'Logged out successfully' });
};
