import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.route.js';
import { connectDB } from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Trust proxy (for secure cookies, rate limiting, etc.)
app.set('trust proxy', 1);

// Helmet for security
app.use(helmet());

// Allowed CORS origins
const allowedOrigins = [
  'https://atu-karigari.onrender.com',
  'http://localhost:5173',
];

// CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Static file serving for uploaded files
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/v1/auth', authRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// SPA fallback route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
