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
import { ResetPasswordInterface } from '../interface/service/reset-password.interface';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService
  let userService: UsersService
  let redisService: RedisService
  let extractKeyJwtUtil: ExtractKeyJwtUtil
  let userRepository: Repository<User>
  let roleRepository: Repository<Role>
  let cacheManager: Cache

  const mockUserRepository = {
    findOneBy: jest.fn(),
    findByEmail: jest.fn(),
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

      jest.spyOn(jwtService, 'sign').mockReturnValueOnce(mockSignedToken)

      const result = await service.login(payload);
      
      // expect(userService.findByEmail).toHaveBeenCalledWith({email: payload.email})
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
      const mockRedisService = {
        set: jest.fn()
      }      
      const mockRes = {
        key: 'cookie-key',
        jwt: 'cookie-with-jwt'
      };
    
      jest.spyOn(extractKeyJwtUtil, 'extract').mockResolvedValue(mockRes);
  
      mockRedisService.set(mockRes.key, mockRes.jwt)

      const result = await service.logout(mockReq);
      
      expect(result).toEqual(mockRes.key) // we don't want antyhing, just no error!
      expect(extractKeyJwtUtil.extract).toHaveBeenCalledWith(mockReq);
      expect(mockRedisService.set).toHaveBeenCalledWith(mockRes.key, mockRes.jwt);
    });
  });

  describe('changePassword', () => {

  });

  describe('forgotPassword', () => {

  });

  describe('forgotEmail', () => {
    it('', async () => {
      console.log(await bcrypt.hash('password', 10));
    });
  });

  describe('resetPassword', () => {
    it('should on success: update the user password', async () => {
      const mockPayload: ResetPasswordInterface = {
        newPassword: 'averysupersecretpassword!',
        confirmPassword: 'averysupersecretpassword!',
        resetPasswordToken: 'afjklhsdaj84kajf0',
      }
      let mockUser: UserInterface = MockUser;

      jest.spyOn(userService, 'findByResetPasswordToken').mockResolvedValue(mockUser);
      jest.spyOn(userService, 'updateUser').mockResolvedValue(null);

      await service.resetPassword(mockPayload);

      expect(userService.findByResetPasswordToken).toHaveBeenCalledWith(mockPayload.resetPasswordToken);
      expect(userService.updateUser).toHaveBeenCalledWith(mockUser.id, mockUser);
    })
  });

  describe('validateUser', () => {
    it('should validate that the credentials belong to a user in the database and return a user',
      async() => {
        const expectedResult: UserInterface = MockUser;
        const loginDto: LoginInterface = {
          email: expectedResult.email,
          password: 'notthispassword',
        }

        jest.spyOn(userService, 'findByEmail').mockResolvedValue(expectedResult);
        // verify the passwords match, with a bcrypt util? 

        const result = await service.validateUser(loginDto)
        expect(result).toEqual(expectedResult);
        expect(userService.findByEmail).toHaveBeenCalledWith({ email: expectedResult.email });
      }
    )
  });

});
