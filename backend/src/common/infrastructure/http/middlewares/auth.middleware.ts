import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "@/common/domain/errors/unauthorized-error";

interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Token not provided");
  }

  const [, token] = authorization.split(" ");

  if (!token) {
    throw new UnauthorizedError("Token not provided");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    ) as unknown as TokenPayload;
    const { id } = decoded;

    req.user = {
      id,
    };

    next();
  } catch (error) {
    throw new UnauthorizedError("Token invalid");
  }
}
