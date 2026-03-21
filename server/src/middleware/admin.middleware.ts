import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token missing"
      });
    }

    const token = authHeader.split(" ")[1];

   
    if (!token) {
      return res.status(401).json({
        message: "Invalid token format"
      });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET not configured");
    }

    jwt.verify(token, secret);

    next();
  } catch {
    return res.status(403).json({
      message: "Invalid or expired token"
    });
  }
};
