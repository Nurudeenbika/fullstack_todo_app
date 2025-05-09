import { Request, Response, NextFunction } from "express";

import AuthService from "../services/auth.service";

import { ApiResponse } from "../utils/apiResponse";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json(
        new ApiResponse(null, "Authentication failed: No token provided", false)
      );
  }

  const token = authHeader.split(" ")[1];

  const userId = AuthService.verifyToken(token);

  if (!userId) {
    return res
      .status(401)
      .json(
        new ApiResponse(null, "Authentication failed: Invalid token", false)
      );
  }

  // Add userId to the request object for use in controllers

  req.userId = userId;

  next();
};

// To extend the Request interface to include userId

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
