import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as console from 'node:console';
import { decrypt } from '../../helpers/crypto.helper';

interface JwtPayload {
  id: string;
  username: string;
  passkey: string;
}

/**
 * Check is User is connected
 */
@Injectable()
export class IsAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    try {
      const user: JwtPayload = this.jwtService.verify<JwtPayload>(token);
      user.passkey = decrypt(user.passkey);
      request['user'] = user;
      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
