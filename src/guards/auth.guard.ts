import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from '../shared/prisma/prisma.service';
import { extractTokenFromHeader } from 'src/commons/auth.common';
import { User } from '@prisma/client';

export type RequestWithUser = Request & { user: any; payload: any };

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Example extract token
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request.headers);

    try {
      // Dummy user
      const user: User = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        password: '12346789',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }

      request['user'] = user;
      return true;
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        this.logger.error(`Token expired: ${error.message}`);
        throw new UnauthorizedException('Token has expired');
      } else {
        this.logger.error(`JWT Verification failed: ${error.message}`);
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
}
