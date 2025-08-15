import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next({ status: 401, message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return next({ status: 401, message: 'Token malformed' });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return next({ status: 404, message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    return next({ status: 403, message: 'Token invalid or expired' });
  }
};

export default authMiddleware;
