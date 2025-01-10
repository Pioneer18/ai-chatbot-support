// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt.auth-guard';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './rbac/permission.entity';
import { RolePermissionMapping } from './rbac/role-permission-mapping.entity';
import { Role } from './rbac/role.entity';
import { UserRoleMapping } from './rbac/user-role-mapping.entity';

@Module({
  imports: [
    // By importing the same secret used when we signed the JWT, we ensure that the verify phase performed by Passport,
    // and the sign phase performed in our AuthService, use a common secret.
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
