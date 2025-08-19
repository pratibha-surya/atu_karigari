import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import ApiError from '../utils/ApiError.js';
import { generateTokens } from '../utils/token.js';


export const signup = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new ApiError('Email and password are required', 400));

  try {
    const exists = await User.findOne({ email });
    if (exists) return next(new ApiError('Email already registered', 400));

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    const tokens = generateTokens(newUser._id);

    newUser.refreshTokens.push({ token: tokens.refreshToken });
    await newUser.save();

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      user: { id: newUser._id, email: newUser.email },
      accessToken: tokens.accessToken,
    });
  } catch (err) {
    next(err);
  }
};


export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new ApiError('Email and password are required', 400));

  try {
    const user = await User.findOne({ email });
    if (!user) return next(new ApiError('Invalid credentials', 400));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ApiError('Invalid credentials', 400));

    const tokens = generateTokens(user._id);

    user.refreshTokens.push({ token: tokens.refreshToken });
    await user.save();

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: { id: user._id, email: user.email },
      accessToken: tokens.accessToken,
    });
  } catch (err) {
    next(err);
  }
};


export const logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    const user = await User.findOne({ 'refreshTokens.token': token });
    if (user) {
      user.refreshTokens = user.refreshTokens.filter(t => t.token !== token);
      await user.save();
    }
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.json({ message: 'Logged out successfully' });
};


export const refreshAccessToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ message: 'Refresh token missing' });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findOne({ _id: decoded.id, 'refreshTokens.token': token });
    if (!user) return res.status(403).json({ message: 'Invalid or expired refresh token' });

    
    user.refreshTokens = user.refreshTokens.filter(t => t.token !== token);

    const newAccessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    });

    const newRefreshToken = jwt.sign({ id: decoded.id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    });

    user.refreshTokens.push({ token: newRefreshToken });
    await user.save();

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Refresh token has expired' });
    }
    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};
