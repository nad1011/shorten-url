import { SetMetadata } from '@nestjs/common';

export const SkipThrottle = () => SetMetadata('skipThrottle', true);
export const CustomThrottle = (limit: number, ttl: number) =>
  SetMetadata('throttler', { limit, ttl });
