import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, JwtService],
  controllers: [UsersController]
})
export class UsersModule {}
