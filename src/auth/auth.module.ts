// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt.auth-guard';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { RolePermissionMapping } from './role-permission-mapping.entity';
import { Role } from './role.entity';
import { UserRoleMapping } from './user-role-mapping.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([Permission]),
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([RolePermissionMapping]),
    TypeOrmModule.forFeature([UserRoleMapping]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
