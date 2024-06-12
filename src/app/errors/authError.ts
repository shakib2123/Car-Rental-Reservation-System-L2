import { Request, Response } from "express";
import httpStatus from "http-status";

export const AuthError = (req: Request, res: Response) => {
  res.status(401).json({
    success: false,
    statusCode: httpStatus.UNAUTHORIZED,
    message: "You have no access to this route",
  });
};
