import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { ApiResponse } from '../utils/apiResponse';

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;
      const user = await AuthService.register(username, email, password);
      res.status(201).json(new ApiResponse({ userId: user._id, username: user.username, email: user.email }, 'User registered successfully', true));
    } catch (error: any) {
      res.status(400).json(new ApiResponse(null, error.message, false));
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.status(200).json(new ApiResponse({ token }, 'Login successful', true));
    } catch (error: any) {
      res.status(401).json(new ApiResponse(null, error.message, false));
    }
  }
}

// Export an instance of the controller
export default new AuthController();