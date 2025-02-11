import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/auth/interfaces/extrated-user.interface';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as User;

      const user: User = {
        id: decoded.id,
        name: decoded.name,
      };

      req.user = user;

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  }
}
