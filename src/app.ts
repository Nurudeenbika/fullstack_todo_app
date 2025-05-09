import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/database';
import authRoutes from './routes/auth.routes';
import todoRoutes from './routes/todo.routes';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

export default app;