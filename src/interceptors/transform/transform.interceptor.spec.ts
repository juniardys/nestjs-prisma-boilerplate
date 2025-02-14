import { Reflector } from '@nestjs/core';
import { TransformInterceptor } from './transform.interceptor';

describe('TransformInterceptor', () => {
  it('should be defined', () => {
    expect(new TransformInterceptor(new Reflector())).toBeDefined();
  });
});
