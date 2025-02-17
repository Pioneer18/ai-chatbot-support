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
import { UsersService } from 'src/users/service/users.service';
import { RedisService } from 'src/redis/service/redis.service';
import { ExtractKeyJwtUtil } from './util/extract-key-jwt.util';
import { User } from 'src/users/interface/enity/user.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    // By importing the same secret used when we signed the JWT, we ensure that the verify phase performed by Passport,
    // and the sign phase performed in our AuthService, use a common secret.
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60m' },
      }),
    }),
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: 'redis',
        host: 'localhost',
        port: 1234,
        ttl: 6000,
      }),
    }),
    TypeOrmModule.forFeature([Permission]),
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([RolePermissionMapping]),
    TypeOrmModule.forFeature([UserRoleMapping]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    JwtAuthGuard,
    UsersService,
    RedisService,
    ExtractKeyJwtUtil,
  ],
  exports: [
    AuthService,
    JwtAuthGuard,
    ExtractKeyJwtUtil
  ],
})
export class AuthModule {}
