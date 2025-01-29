import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../interface/enity/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { FindByEmailDto } from '../dto/find-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserInterace } from '../interface/service/update-user.interface';
import { RemoveUserInterface } from '../interface/service/remove-user.interface';
import { CommonErrors } from '../../common/errors/errors';
import { UserInterface } from '../interface/user.interface';
import { v4 as uuidv4 } from 'uuid'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  createUser = async (userInput: CreateUserDto): Promise<UserInterface> => {
    try {
      const userData: UserInterface = {
        ...userInput,
        resetPasswordExpires: null,
        resetPasswordToken: null,
        role: 'patient', // this should be a given value; e.g. physician, admin
        profilePic: '',
        isActive: true,
        id: uuidv4(),
      }
  
      const duplicate = await this.usersRepository.findBy({email: userData.email});
      if (duplicate[0]) {
        throw new Error('user account already exists for ' + userData.email);
      }

      await this.usersRepository.create(userData);
      const user = await this.usersRepository.save(userData);
      console.log(`user: ${JSON.stringify(user)}`)

      return user;
    } catch (err) {
      throw new Error(err);
    } 
  }

  updateUser = async (id: string, userData: UpdateUserInterace): Promise<UpdateResult> => {
    try {
      const user = await this.usersRepository.update(id, userData);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  findAll(): Promise<User[]> {
    try {
      return this.usersRepository.find();
    } catch (err) {
      throw new Error(err);
    }
  }

  findOne(id: string): Promise<UserInterface> {
    try {
      return this.usersRepository.findOneBy({ id });
    } catch (err) {
      throw new Error(err);
    }
  }

  findByEmail = async (dto: FindByEmailDto): Promise<UserInterface> => {
    try {
      const email = dto.email;
      const user = await this.usersRepository.findOneBy({ email });
      if (!user) {
        throw CommonErrors.userNotFound;
      }
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  findByResetPasswordToken = async (token: string): Promise<UserInterface> => {
    try {
      const user = await this.usersRepository.findOneBy({ resetPasswordToken: token});
      if(!user) {
        throw CommonErrors.userNotFound;
      }
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  removeUser = async (userData: RemoveUserInterface): Promise<void> => {
    try {
      await this.usersRepository.delete(userData.email);
    } catch (err) {
      throw new Error(err);
    }
  }

  // private
  // createUserUpdate
  // logoutUser and don't return anything
}
