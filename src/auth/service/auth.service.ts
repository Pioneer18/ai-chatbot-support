// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './rbac/role.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Role)
    private roleRepository,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  // verify user exists then return signed JWT for logged-in user
  async generateJwt(payload: JwtPayload): Promise<string> {
    const user = await this.userService.findOne(payload.id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.jwtService.sign(payload);
  }

  async createRole(newRole: Role) {
    return this.roleRepository.create(newRole)
  }
}
