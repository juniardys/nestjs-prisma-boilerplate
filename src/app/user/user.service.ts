import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { PaginatedResult, PaginateFunction, paginator } from '../../commons/paginator.common';
import { GetUserQueryDto } from './dto/get-user-query.dto';
import { transformUserToResponseData } from './transform/user.transform';
import { GetUserResponseData } from './types/user';

const paginate: PaginateFunction = paginator({ perPage: 3 });

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async getUser(query: GetUserQueryDto, user: User): Promise<PaginatedResult<GetUserResponseData>> {
    const queryUsers: Prisma.UserFindManyArgs = {};

    const users: PaginatedResult<GetUserResponseData> = await paginate(
      this.prisma.user,
      queryUsers,
      {
        page: query.page,
        perPage: query.perPage,
      },
      transformUserToResponseData,
    );

    return users;
  }
}
