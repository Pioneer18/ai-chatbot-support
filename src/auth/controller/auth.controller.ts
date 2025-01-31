// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, UseGuards, Res, Req } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Response, Request } from 'express';
import { JwtAuthGuard } from '../guards/jwt.auth-guard';
import { ResetPasswordDTO } from '../dto/reset-password.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

   /**
    * **summary**: Authenticate and login a user
    * @param email The user's email
    * @param password The user's submitted password to be validated
    */
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)  // extracts email and password from body, validates, and puts user in req
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    try{
      const user: any = req.user
      const cookie = await this.authService.login({email: user.email, password: user.password});
      res.setHeader('Set-Cookie', cookie);
      return res.send(req.user);
    } catch(err) {
      res.status(401).json({message: err.message || 'Authentication failed'});
    }
  }

  /**
   * **summary**: Logout a user by adding their JWT to a Redis 'dead-list' that will end the user's authorized
   * session prior to the JWT expiration time
   * @param req The request containing the user's JWT payload to be added to the logged-out 'dead-list' in the Redis cache
   */
  // @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<{message: string}> {
    try {
      const key = await this.authService.logout(req)
      res.clearCookie(key, { path: '/' });
      return {message: 'logged out successfully'}
    } catch (err) {
      res.status(500).json({message: err.message || 'Logout failed'});
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() payload: ResetPasswordDTO, @Res() res: Response) {
    try {
      await this.authService.resetPassword(payload);
      res.redirect('/login')
    } catch(err) {
      res.status(500).json({message: 'unexpected server error: failed to reset the password'});
    }
  }

  // Role endpoints?
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Req() req, @Body() payload: ChangePasswordDto, @Res() res: Response) {
    try {
      console.log(req.user);
      console.log('hello');
      console.log(payload.confirmPassword, payload.newPassword, payload.originalPassword); 
    } catch (err) {
      throw err; // let the exception filter handle it? or whatever module it is that handles that
    }
  }
}
