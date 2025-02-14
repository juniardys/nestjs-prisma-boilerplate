import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): Partial<User> => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
