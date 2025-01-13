import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

describe('RedisService', () => {
  let service: RedisService;
  let cacheManager: Cache

  let mockCacheManager = {
    get: jest.fn().mockResolvedValue('some-users-jwt'),
    set: jest.fn(),
    del: jest.fn(),
    reset: jest.fn(),
  } as unknown as Cache;
  const mockKey = 'test-key';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager
        }
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get method test', () => {
    it('should return the jwt for the given key', async () => {
      const result = await service.get(mockKey);
      expect(cacheManager.get).toHaveBeenCalledWith(mockKey);
      expect(result).toEqual('some-users-jwt');
    })
  });

  describe('sync get method test', () => {
    it('should synchornously return the jwt for the given key', async () => {
      const result = await service.syncGet(mockKey);
      expect(cacheManager.get).toHaveBeenCalledWith(mockKey);
      expect(result).toEqual('some-users-jwt');
    })
  });

  describe('set method test', () => {
    it('should set the cache key with the new value', async () => {
      const mockJwt = 'mock-jwt-string';
      await service.set(mockKey, mockJwt)
      expect(cacheManager.set).toHaveBeenCalledWith(mockKey, mockJwt, null)
    })
  });
});
