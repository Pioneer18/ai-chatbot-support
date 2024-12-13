// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: JwtPayload) {
    const jwt = await this.authService.generateJwt(payload);
    return { access_token: jwt };
  }

  // logout
  // resetPassword
  // resetUsername
  // deleteAccount
  // createAccount
}
