import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { RedisService } from './redis.service';

describe('RedisService', () => {
  let redisService: RedisService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    redisService = module.get<RedisService>(RedisService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  describe('get', () => {
    it('should retrieve a value from the cache', async () => {
      const key = 'test-key';
      const mockValue = 'test-value';
      jest.spyOn(cacheManager, 'get').mockResolvedValue(mockValue);

      const result = await redisService.get(key);

      expect(cacheManager.get).toHaveBeenCalledWith(key);
      expect(result).toBe(mockValue);
    });
  });

  describe('syncGet', () => {
    it('should synchronously retrieve a value from the cache', async () => {
      const key = 'test-key';
      const mockValue = 'test-value';
      jest.spyOn(cacheManager, 'get').mockResolvedValue(mockValue);

      const result = await redisService.syncGet(key);

      expect(cacheManager.get).toHaveBeenCalledWith(key);
      expect(result).toBe(mockValue);
    });
  });

  describe('set', () => {
    it('should set a value in the cache', async () => {
      const key = 'test-key';
      const value = 'test-value';
      jest.spyOn(cacheManager, 'set').mockResolvedValue(null);

      const result = await redisService.set(key, value);

      expect(cacheManager.set).toHaveBeenCalledWith(key, value, null);
      expect(result).toBeNull(); // Assuming set resolves to null
    });
  });
});
