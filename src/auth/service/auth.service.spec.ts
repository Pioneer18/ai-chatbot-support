import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/service/users.service';
import { MockUser } from '../../../test/mock-user';
import { UserInterface } from '../../users/interface/user.interface';
import { User } from '../../users/interface/enity/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../rbac/role.entity';
import { LoginInterface } from '../interface/service/login.interface';
import { Request } from 'express';
import { ExtractKeyJwtUtil } from '../util/extract-key-jwt.util';
import { RedisService } from '../../redis/service/redis.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService
  let redisService: RedisService
  let userService: UsersService
  let extractKeyJwtUtil: ExtractKeyJwtUtil
  let userRepository: Repository<User>
  let roleRepository: Repository<Role>
  let cacheManager: Cache

  const mockUserRepository = {
    findOneBy: jest.fn()
  }

  const mockRoleRepository = {
    // 
  }

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  }

  beforeEach(async () => {
    const jwtServiceMock = {
      sign: jest.fn().mockResolvedValue('jwt-cookie')
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        ExtractKeyJwtUtil,
        RedisService,
        {provide: JwtService, useValue: jwtServiceMock},
        {provide: CACHE_MANAGER, useValue: mockCacheManager},
        {provide: getRepositoryToken(User), useValue: mockUserRepository},
        {provide: getRepositoryToken(Role), useValue: mockRoleRepository},
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService)
    userService = module.get<UsersService>(UsersService)
    extractKeyJwtUtil = module.get<ExtractKeyJwtUtil>(ExtractKeyJwtUtil)
    redisService = module.get<RedisService>(RedisService)
    cacheManager = module.get<Cache>(CACHE_MANAGER)
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role))
  });

  describe('Auth Service Initialize', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  })

  describe('login', () => {
    it('should return a signed payload after verifying the user exists', async () => {
      const payload: LoginInterface= {
        email: 'solid.snake@gmail.com',
        password: 'bigboss'
      }
      const mockSignedToken = 'jwt-cookie'
      const mockUser: UserInterface = MockUser;

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser);
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce(mockSignedToken)

      const result = await service.login(payload);
      
      expect(userService.findByEmail).toHaveBeenCalledWith({email: payload.email})
      expect(jwtService.sign).toHaveBeenCalledWith(payload);
      expect(result).toBe(`Authentication=${mockSignedToken}; Secure; HttpOnly; Path=/; Max-Age=undefined`);
    })
  })

  describe('logout', () => {

    it(`should logout the user and return a key value pair`, async () => {
      const mockReq = {
        headers: {
          cookie: 'cookie-key=cookie-with-jwt' 
        }
      } as Request;
      
      const mockRes = {
        key: 'cookie-key',
        jwt: 'cookie-with-jwt'
      };
    
      const mockRedisService = {
        set: jest.fn()
      }
  
      const mockExtractKeyValueUtil = {
        extractKeyAndValue: jest.fn().mockResolvedValue(mockRes)
      }
  
      const {key, jwt} = mockExtractKeyValueUtil.extractKeyAndValue(mockReq.headers.cookie)
      mockRedisService.set(key, jwt)
      const result: string = await service.logout(mockReq);
      
      expect(result).toEqual(mockRes.key)
      expect(mockExtractKeyValueUtil.extractKeyAndValue).toHaveBeenCalledWith(mockReq.headers.cookie)
      expect(mockRedisService.set).toHaveBeenCalledWith(key, jwt)
    });
  })
});
