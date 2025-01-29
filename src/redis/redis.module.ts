import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store'; 
import { RedisService } from './service/redis.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: redisStore,
        host: 'localhost',
        port: 6379,
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
