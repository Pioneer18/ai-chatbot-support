// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../rbac/role.entity';
import { UsersService } from '../../users/service/users.service';
import { LoginDto } from '../dto/login.dto';
import { Request } from 'express';
import { ExtractKeyJwtUtil } from '../util/extract-key-jwt.util';
import { RedisService } from '../../redis/service/redis.service';
import { ValidateUserReturn } from '../interface/service/validate-user-return.interface';
import { ResetPasswordInterface } from '../interface/service/reset-password.interface';
import { UserInterface } from '../../users/interface/user.interface';
import { CommonErrors } from '../../common/errors/errors';

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
    try {
      const user = await this.userService.findByEmail({email: payload.email});
      if (!user) {
        throw new Error('User not found');
      }
      const token = this.jwtService.sign(payload);
      return `Authentication=${token}; Secure; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_TIME}`;
    } catch (err) {
      throw new Error(err);
    }
  }
  
  async logout(req: Request): Promise<string> {
    try {
      const {key, jwt} = await this.extractKeyJwtUtil.extract(req);
      if (!key || !jwt) {
        throw new Error
      }
      await this.redisService.set(key, jwt);
      return key;
    } catch (err) {
      throw new Error(err)
    }
  }

  async resetPassword(payload: ResetPasswordInterface) {
    try {
      let user = await this.userService.findByResetPasswordToken(payload.resetPasswordToken);
      if (new Date >= user.resetPasswordExpires) {
        throw new Error('this passowrd reset request has expired, please make a new request.')
      }
      
      await this.verifyNewPassword(payload.newPassword, user);
      user.password = await bcrypt.hash(payload.newPassword, 10);
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      await this.userService.updateUser(user.id, user)
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createRole(newRole: Role) {
    try {
      return this.roleRepository.create(newRole)
    } catch (err) {
      throw new Error(err);
    }
  }
  
  /**
   * Find user in the databse and authenticate their access to the application by verifying the present user credentials in the database
   */
  async validateUser({email, pass}): Promise<ValidateUserReturn> {
    return 
  }

  private async verifyNewPassword(newPass: string, user: UserInterface) {
    try {
      const check = await bcrypt.compare(newPass, user.password);
      if (check) {
        throw CommonErrors.newPasswordError;
      }
      return;
    } catch (err) {
      throw new Error(err)
    }
  }
}
