import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../../interceptors/transform/transform.interceptor';
import { AuthGuard } from '../../guards/auth.guard';
import { GetUser } from '../../decorators/get-user/get-user.decorator';
import { ResponseMessage } from '../../decorators/response/response.decorator';
import { User } from '@prisma/client';
import { GetUserQueryDto } from './dto/get-user-query.dto';

@ApiTags('User')
@UseInterceptors(TransformInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Example get user',
  })
  @ResponseMessage("Successfully get user")
  @Get()
  async getUser(
    @Query() query: GetUserQueryDto,
    @GetUser() user: User
  ) {
    return this.userService.getUser(query, user);
  }
}
