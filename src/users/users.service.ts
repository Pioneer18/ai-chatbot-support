import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private jwtService: JwtService) {}

  // Authenticate and issue JWT token for users
  generateJwt(userId: string): string {
    const payload = { userId };
    return this.jwtService.sign(payload);
  }
}
