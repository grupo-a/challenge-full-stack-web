import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class TypeGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const type = this.reflector.get<string>('user_type', context.getHandler());
    if (!type) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.user_type == type;
  }
}
