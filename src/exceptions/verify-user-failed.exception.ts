import { BadRequestException } from '@nestjs/common';

export class VerifyUserFailedException extends BadRequestException {
  constructor(message?: string, errorCode: number = 400) {
    super({
      errorCode,
      message,
    });
  }
}
