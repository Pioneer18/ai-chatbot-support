// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Role } from './rbac/role.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: JwtPayload) {
    const jwt = await this.authService.generateJwt(payload);
    return { access_token: jwt };
  }

  @Post('new_role')
  async newRole(@Body() newRole: Role) {
    const result = await this.authService.createRole(newRole);
    return { result}
  }

  // logout
  // resetPassword
  // resetUsername
  // deleteAccount
  // createAccount
}
