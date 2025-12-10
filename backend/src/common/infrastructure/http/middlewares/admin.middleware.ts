import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "@/common/domain/errors/forbidden-error";

import { UserRole } from "@/modules/user/domain/enums/user-role.enum";

export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { role } = req.user;

  if (role !== UserRole.ADMIN) {
    throw new ForbiddenError("Access denied");
  }

  next();
}
