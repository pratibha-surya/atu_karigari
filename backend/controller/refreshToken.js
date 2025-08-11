import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export const refreshAccessToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const newAccessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const newRefreshToken = jwt.sign({ id: decoded.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Strict', 
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Refresh token has expired' });
    }
    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};
