import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import { UsersService } from '../../users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../rbac/role.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LoginDto } from '../dto/login.dto';
import { Request, Response } from 'express';
import { RedisService } from '../../redis/service/redis.service';
import { ExtractKeyJwtUtil } from '../util/extract-key-jwt.util';
import { User } from '../../users/interface/enity/user.entity';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let redisService: RedisService;
  let roleRepository: Repository<Role>;
  let userRepository: Repository<User>;
  let extractKeyJwtUtil: ExtractKeyJwtUtil;
  let cacheManager: Cache

  const mockUserRepository = {
    // put methods here
  }

  const mockRoleRepository = {
    // put methods here
  }

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService, 
        UsersService, 
        JwtService,
        RedisService,
        ExtractKeyJwtUtil,
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleRepository
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository
        },
        {provide: CACHE_MANAGER, useValue: mockCacheManager},
    ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService)
    redisService = module.get<RedisService>(RedisService)
    extractKeyJwtUtil = module.get<ExtractKeyJwtUtil>(ExtractKeyJwtUtil)
    cacheManager = module.get<Cache>(CACHE_MANAGER)
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role))
  });

  describe('auth controller initialized', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  })

  describe('login success', () => {
    it('should return response header with signed JWT cookie set', async () => {
      const loginDto: LoginDto = {
        email: 'solid.snake@gmail.com',
        password: 'bigboss'
      }
      
      const mockResponse: Response = {
        setHeader: jest.fn()
      } as unknown as Response;
    
      jest.spyOn(service, 'login').mockResolvedValue('cookie-with-jwt');

      await controller.login(loginDto, mockResponse);
      
      expect(service.login).toHaveBeenCalledWith(loginDto);

      expect(mockResponse.setHeader).toHaveBeenCalledWith('Set-Cookie', 'cookie-with-jwt');
    });
  })

  describe('logout success', () => {
    it('should expire an valid JWT by placing it in the Redis dead-list', async () => {
      const mockReq = {
        headers: {
          cookie: 'cookie-key=cookie-with-jwt'
        }
      } as Request;
      
      const mockRes = {
        clearCookie: jest.fn()
      } as unknown as Response;

      const mockKey = 'cookie-key';
      
      jest.spyOn(service, 'logout').mockResolvedValue(mockKey)
      
      const controllerResponse = await controller.logout(mockReq, mockRes)

      expect(service.logout).toHaveBeenCalledWith(mockReq);
      
      expect(mockRes.clearCookie).toHaveBeenCalledWith(mockKey, { path: '/' })
      
      expect(controllerResponse).toEqual({message: 'logged out successfully'})
    });
  })

  describe('logout failure', () => {
    it('should throw an error if service.logout fails', async () => {
      const mockReq = {
        headers: {
          cookie: 'cookie-key=cookie-with-jwt',
        },
      } as Request;
  
      const mockRes = {
        clearCookie: jest.fn(),
      } as unknown as Response;

      const errMsg = 'Logout failed';
  
      jest.spyOn(service, 'logout').mockRejectedValue(new Error(errMsg));
  
      await expect(controller.logout(mockReq, mockRes)).rejects.toThrow(errMsg);

      expect(service.logout).toHaveBeenCalledWith(mockReq);

      expect(mockRes.clearCookie).not.toHaveBeenCalled()
    });
  })
  
});
