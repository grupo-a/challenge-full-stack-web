import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ERRORS_DESCRIPTION } from '../errors/errors.enum';
import * as jwt from 'jsonwebtoken';
import { PermissionsService } from '../../modules/permissions/permissions.service';
import { COMPARING_METHODS } from './access.enum';

interface RequestToken extends Request {
  id: string;
}

@Injectable()
export class AccessMiddleware implements NestMiddleware {
  constructor(private readonly service: PermissionsService) {}

  async use(req: RequestToken, _res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) throw new Error(ERRORS_DESCRIPTION.UNAUTHORIZED);
    const token = authorization.split(' ')[1];
    if (!token) throw new Error(ERRORS_DESCRIPTION.UNAUTHORIZED);
    const { id } = jwt.decode(token) as jwt.JwtPaylod;
    const found = await this.service.getByEmployeeId(id);
    if (!found[COMPARING_METHODS[req.method]]) {
      throw new Error(ERRORS_DESCRIPTION.UNAUTHORIZED);
    }
    next();
  }
}
