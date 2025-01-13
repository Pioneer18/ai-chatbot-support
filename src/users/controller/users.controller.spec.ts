import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../interface/enity/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Repository, UpdateResult } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindByEmailDto } from '../dto/find-user.dto';
import { MockUser } from '../../../test/mock-user';
import { RemoveUserDto } from '../dto/remove-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let jwtService: JwtService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: repository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create unit test', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        first_name: 'Solid',
        last_name: 'Snake',
        phone_number: '123456789',
        email: 'solid.snake@gmail.com',
        password: 'bigboss',
      }
      const mockUser: User = MockUser;
  
      jest.spyOn(service, 'createUser').mockResolvedValue(mockUser);
  
      const user = await controller.create(createUserDto);
  
      expect(user).toEqual(mockUser);
      expect(service.createUser).toHaveBeenCalledWith(createUserDto)
    })
  })

  describe('update unit test', () => {
    it('should update the user and return the updated user', async () => {
      const updateUserDto: UpdateUserDto = {
        first_name: 'Solid',
        last_name: 'Snake',
        phone_number: '123456789',
        email: 'solid.snake@gmail.com',
      }
      const mockUpdateResult: UpdateResult = { affected: 1, raw: [], generatedMaps: [] };
      
      jest.spyOn(service, 'updateUser').mockResolvedValue(mockUpdateResult);
  
      const user = await controller.update('9d3c5b62-d559-4960-ad1d-da083c089f0e', updateUserDto);
  
      expect(user).toEqual(mockUpdateResult);
      expect(service.updateUser).toHaveBeenCalledWith('9d3c5b62-d559-4960-ad1d-da083c089f0e', updateUserDto)
    });
  })

  describe('remove unit test', () => {
    it('should remove a user', async () => {
      const removeUserDto: RemoveUserDto = { email: 'solid.snake@gmail.com', password: 'bigboss' };
  
      jest.spyOn(service, 'removeUser').mockResolvedValue(null);
  
      const result = await controller.remove(removeUserDto);
      expect(result).toEqual(null);
      expect(service.removeUser).toHaveBeenCalledWith(removeUserDto);
  
    });
  })

  describe('find by email unit test', () => {
    it('should find a user by email', async () => {
      const emailDto: FindByEmailDto = { email: 'solid.snake@gmail.com' };
      const mockUser: User = MockUser;
  
      jest.spyOn(service, 'findByEmail').mockResolvedValue(mockUser);
  
      expect(await controller.findByEmail(emailDto)).toEqual(mockUser);
      expect(service.findByEmail).toHaveBeenCalledWith(emailDto);
    });
  })
});
