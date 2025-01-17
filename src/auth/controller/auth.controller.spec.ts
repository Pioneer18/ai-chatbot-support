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
import { ResetPasswordDTO } from '../dto/reset-password.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let redisService: RedisService;
  let usersService: UsersService;
  let roleRepository: Repository<Role>;
  let userRepository: Repository<User>;
  let extractKeyJwtUtil: ExtractKeyJwtUtil;
  let cacheManager: Cache

  const mockUserRepository = {
    update: jest.fn()
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
    service = module.get<AuthService>(AuthService);
    redisService = module.get<RedisService>(RedisService);
    usersService = module.get<UsersService>(UsersService);
    extractKeyJwtUtil = module.get<ExtractKeyJwtUtil>(ExtractKeyJwtUtil);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  describe('auth controller initialized', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  })

  describe('login', () => {
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

    it('should return error message for authentication failed', async () => {
      const loginDto: LoginDto = {
        email: 'solid.snake@gmail.com',
        password: 'bigboss'
      }
     
      const err = new Error(`the given credentials are incorrect`);

      const mockResponse: Response = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(), // Allow method chaining
        json: jest.fn()
      } as unknown as Response;

      jest.spyOn(service, 'login').mockRejectedValue(err);

      await controller.login(loginDto, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(401); // Check status was set
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: err.message || 'Authentication failed',
      });
    });
  });

  describe('logout', () => {
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
    
    it('should send a 500 response and not clear the cookie with the jwt', async () => {
      const mockReq = {
        headers: {
          cookie: 'cookie-key=cookie-with-jwt',
        },
      } as Request;
  
      const mockRes = {
        clearCookie: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
  
      const err = new Error(`unexpected server error: failed to logout`);
  
      jest.spyOn(service, 'logout').mockRejectedValue(err);
  
      await controller.logout(mockReq, mockRes);
  
      expect(service.logout).toHaveBeenCalledWith(mockReq);
  
      expect(mockRes.clearCookie).not.toHaveBeenCalled()
    });
  });

  describe('changePassword', () => {
    it('should validate the verify the original and new password before updating password on the user', async () => {
      // TODO
      const dto: ChangePasswordDto = {
        originalPassword: 'notthispassword!', // should be the pass on the MockUser
        newPassword: 'codingissofun',
        confirmPassword: 'codingissofun',
      };
    });

    it('should return a 400 response due to original password not being correct', async () => {

    });

    it('should return a 400 response due to new password not matching the confirm new password', async () => {
      // TODO
    });
  });
  
  describe('forgotPassword', () => {
    it('should verify the email belongs to a user and send the reset link to the email', async () => {
      // TODO
    });

    it('should return a 400 response due to the email not belonging to a user', () => {
      // TODO
    })
  });

  describe('forgotEmail', () => {
    it('should verify the given password and ask a validation question before sending recovery info to alternate email or phone', () => {
      // TODO
    });

    it('should send 400 response for bad password request', async () => {

    });

    it('should send 400 response for bad validation response', async () => {

    });
  })
  
  describe('resetPassword', ()=> {
    it('should on success: update the password and redirect user to login page', async () => {
      const mockResetPasswordDto: ResetPasswordDTO = {
        newPassword: 'ghost',
        confirmPassword: 'section9',
        resetPasswordToken: 'dhjf9kjgh4kh31'
      };

      const mockResponse = {
        redirect: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      jest.spyOn(service, 'resetPassword').mockResolvedValue(null); // it's a void function

      await controller.resetPassword(mockResetPasswordDto, mockResponse);

      expect(service.resetPassword).toHaveBeenCalledWith(mockResetPasswordDto);
      expect(mockResponse.redirect).toHaveBeenCalledWith('/login'); 
    })

    it('should send a 400 response due to the new password not matching the confirm password', async () => {
      // TODO
    })
  });

});
