import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next({ status: 401, message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return next({ status: 401, message: 'Token malformed' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return next({ status: 403, message: 'Token invalid' });

    req.user = user;
    next();
  });
};

export default authMiddleware;
