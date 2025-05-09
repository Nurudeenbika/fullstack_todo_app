import express from 'express';
import AuthController from '../controllers/auth.controller';

const router = express.Router();

// Auth routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// For debugging - log when routes are loaded
console.log('Auth routes loaded');

export default router;