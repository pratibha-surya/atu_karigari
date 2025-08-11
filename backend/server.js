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


connectDB();


const app = express();


app.use(helmet()); 
app.use(cors()); 
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again later.'
}));
app.use(morgan('dev')); 
app.use(express.json()); 
app.use(cookieParser()); 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/v1/auth', authRoutes); 


app.use(errorHandler);


app.use(express.static(path.join(__dirname, '../frontend/dist')));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
