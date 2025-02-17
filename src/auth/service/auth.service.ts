// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../rbac/role.entity';
import { UsersService } from '../../users/service/users.service';
import e, { Request } from 'express';
import { ExtractKeyJwtUtil } from '../util/extract-key-jwt.util';
import { RedisService } from '../../redis/service/redis.service';
import { ResetPasswordInterface } from '../interface/service/reset-password.interface';
import { UserInterface } from '../../users/interface/user.interface';
import { CommonErrors } from '../../common/errors/errors';
import { LoginInterface } from '../interface/service/login.interface';

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
   * **summary**:  Find the user in the database and authenticate their access to the application by verifying the present user credentials in the database
   * @param email The user email
   * @param pass The user password
   */
  validateUser = async (credentials: LoginInterface): Promise<UserInterface> => {
    try {
      const user = await this.userService.findByEmail({email: credentials.email});
      await this.verifySamePassword(credentials.password, user.password);
      return user;

    } catch (err) {
      throw err;
    }
  }

  /**
   * summary: Return a JWT inside of a Cookie, which may only be interacted with by Http and not Javascript, to the now authenticated user
   * @param user The user logging into the application
   */
  login = async (loginDto: LoginInterface): Promise<string> => {
    try {
      const token = await this.jwtService.sign(loginDto);
      return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_TIME}`;
    } catch (err) {
      throw err;
    }
  }
  
  logout = async (req: Request): Promise<string> => {
    try {
      const {key, jwt} = await this.extractKeyJwtUtil.extract(req);
      if (!key || !jwt) {
        throw new Error
      }
      console.log('Setting Redis Dead-List with: ' + key + ' and ' + jwt);
      await this.redisService.set(key, jwt);
      console.log('JWT: ' + jwt + ' is now on the Dead-List, LoggedOutGuard will block this JWT even if it is not expired!');
      return key;
    } catch (err) {
      throw new Error(err)
    }
  }

  changePassword = async () => {

  }

  forgotPassword = async () => {

  }

  forgotEmail = async () => {

  }

  resetPassword = async (resetPasswordDto: ResetPasswordInterface) => {
    try {
      let user = await this.userService.findByResetPasswordToken(resetPasswordDto.resetPasswordToken);
      if (new Date >= new Date(user.resetPasswordExpires)) {
        throw new Error('this passowrd reset request has expired, please make a new request.')
      }
      
      await this.verifyNewPassword(resetPasswordDto.newPassword, user);
      user.password = await bcrypt.hash(resetPasswordDto.newPassword, 10);
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      await this.userService.updateUser(user.id, user)
    } catch (err) {
      throw err;
    }
  }

  private verifyNewPassword = async(newPass: string, user: UserInterface): Promise<void> => {
    if (await bcrypt.compare(newPass, user.password)) {
      throw CommonErrors.newPasswordError;
    }
    return;
  }

  private verifySamePassword = async(incoming: string, current: string): Promise<void> => {
    if (!await bcrypt.compare(incoming, current)) {
      throw CommonErrors.invalidPassword;
    }
    return;
  }

  // Role endpionts?
}
