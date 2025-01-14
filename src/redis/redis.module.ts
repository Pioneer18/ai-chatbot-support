import { Module } from '@nestjs/common';
import { RedisService } from './service/redis.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.registerAsync({
      // imports: [],
      // inject: [],
      useFactory: async () => ({
        store: 'redis',
        host: 'localhost',
        port: 1234,
        ttl: 6000, // 1 hour
      }),
    }),
  ],
  providers: [RedisService],
  exports: [
    RedisService,
    CacheModule
  ],
})
export class RedisModule {}
