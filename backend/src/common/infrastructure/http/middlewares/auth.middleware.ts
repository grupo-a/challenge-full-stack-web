import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "@/common/domain/errors/unauthorized-error";
import { UserRole } from "@/modules/user/domain/enums/user-role.enum";

interface TokenPayload {
  id: number;
  role: UserRole;
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
      process.env.JWT_SECRET as string
    ) as unknown as TokenPayload;
    const { id, role } = decoded;

    req.user = {
      id,
      role,
    };

    next();
  } catch (error) {
    throw new UnauthorizedError("Token invalid");
  }
}
