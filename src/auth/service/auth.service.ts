// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../rbac/role.entity';
import { UsersService } from '../../users/service/users.service';
import { LoginDto } from '../dto/login.dto';
import { Request } from 'express';
import { ExtractKeyJwtUtil } from '../util/extract-key-jwt.util';
import { RedisService } from '../../redis/service/redis.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Role)
    private roleRepository,
    private userService: UsersService,
    private jwtService: JwtService,
    private redisService: RedisService,
    private extractKeyJwtUtil: ExtractKeyJwtUtil,
  ) {}

  /**
   * summary: Return a JWT inside of a Cookie, which may only be interacted with by Http and not Javascript, to the now authenticated user
   * @param user The user logging into the application
   */
  async login(payload: LoginDto): Promise<string> {
    const user = await this.userService.findByEmail({email: payload.email});
    if (!user) {
      throw new Error('User not found');
    }
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; Secure; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_TIME}`;
  }

  
  async createRole(newRole: Role) {
    return this.roleRepository.create(newRole)
  }
  
  async logout(req: Request): Promise<string> {
      const {key, jwt} = await this.extractKeyJwtUtil.extract(req);
      if (!key || !jwt) {
        throw new Error
      }
      await this.redisService.set(key, jwt);
      return key;
  }
  /**
   * Find user in the databse and authenticate their access to the application by verifying the present user credentials in the database
   */
  

}
