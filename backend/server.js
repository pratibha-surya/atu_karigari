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

// ✅ Helmet with CSP and referrer fix
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://atu-karigari.onrender.com',
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://fonts.googleapis.com',
        ],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: [
          "'self'",
          'data:',
          'https://atu-karigari.onrender.com',
        ],
        connectSrc: [
          "'self'",
          'https://atu-karigari.onrender.com',
          'http://localhost:5000', // ✅ allow local dev connections
        ],
        frameSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'", 'https://atu-karigari.onrender.com'],
        // ✅ Allow all referrers (fixes referrer policy block)
        referrer: ['*'],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// ✅ Optionally also explicitly set referrer policy header
app.use(
  helmet.referrerPolicy({
    policy: 'strict-origin-when-cross-origin',
  })
);

// ✅ Enable CORS for frontend
app.use(cors({
  origin: 'https://atu-karigari.onrender.com',
  credentials: true,
}));

// ✅ Apply rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
}));

// ✅ Logging and parsers
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// ✅ Setup __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve uploaded files
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes
app.use('/api/v1/auth', authRoutes);

// ✅ Serve frontend build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// ✅ Error handling middleware
app.use(errorHandler);

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
