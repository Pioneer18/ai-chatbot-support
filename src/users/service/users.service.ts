import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../interface/enity/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { FindByEmailDto } from '../dto/find-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserInterace } from '../interface/service/update-user.interface';
import { RemoveUserInterface } from '../interface/service/remove-user.interface';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async removeUser(userData: RemoveUserInterface): Promise<void> {
    await this.usersRepository.delete(userData.email);
  }

  // ---------------

  findByEmail = async (dto: FindByEmailDto): Promise<User | null> => {
    try {
      const email = dto.email;
      const user = await this.usersRepository.findOneBy({ email });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  createUser = async (userData: CreateUserDto): Promise<User | null> => {
    try {
      const user = await this.usersRepository.create(userData);
      return user;
    } catch (err) {
      throw new Error(err);
    } 
  }

  updateUser = async (id: string, userData: UpdateUserInterace): Promise<UpdateResult | null> => {
    try {
      const user = await this.usersRepository.update(id, userData);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}
