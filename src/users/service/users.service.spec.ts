import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../interface/enity/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserInterace } from '../interface/service/update-user.interface';
import { MockUser } from '../../../test/mock-user';
import { RemoveUserInterface } from '../interface/service/remove-user.interface';
import { FindByEmailDto } from '../dto/find-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let jwtService: JwtService;

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    findOneByEmail: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('createUser', () => {
    it('should create a new user and return it', async () => {
      const createUserDto: CreateUserDto = {
        first_name: 'Solid',
        last_name: 'Snake',
        phone_number: '123456789',
        email: 'solid.snake@gmail.com',
        password: 'bigboss',
      };
      const mockUser: User = { 
        id: '9d3c5b62-d559-4960-ad1d-da083c089f0e',
        reset_password_expires: '01-10-2025',
        reset_password_token: 'mockToken',
        password_hash: 'mockHash',
        role: 'patient',
        profile_pic: 'mockPicUrl',
        is_active: true,
        ...createUserDto,
      };
      mockRepository.create.mockResolvedValue(mockUser);

      const result = await service.createUser(createUserDto);
      expect(result).toEqual(mockUser);
      expect(mockRepository.create).toHaveBeenCalledWith(createUserDto);
    })
  });

  describe('updateUser', () => {
    it('should update a user and return it', async () => {
      const updateUserInterface: UpdateUserInterace = {
        first_name: 'Solid',
        last_name: 'Snake',
        phone_number: '123456789',
        email: 'solid.snake@gmail.com',
      };
      const mockUpdateResult: UpdateResult = { affected: 1, raw: [], generatedMaps: [] };
      mockRepository.update.mockResolvedValue({ affected: 1, raw: [], generatedMaps: [] });

      const result = await service.updateUser('9d3c5b62-d559-4960-ad1d-da083c089f0e', updateUserInterface);
      expect(result).toEqual(mockUpdateResult);
      expect(mockRepository.update).toHaveBeenCalledWith('9d3c5b62-d559-4960-ad1d-da083c089f0e', updateUserInterface);
      
    })
  })

  describe('removeUser', () => {
    it('should delete a user by email', async () => {
      const removeUserDto: RemoveUserInterface = { email: 'solid.snake@gmail.com', password: 'bigboss' };
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.removeUser(removeUserDto);
      expect(mockRepository.delete).toHaveBeenCalledWith(removeUserDto.email);
    });

    it('should handle non-existent user deletion gracefully', async () => {
      const removeUserDto: RemoveUserInterface = { email: 'solid.snake@gmail.com', password: 'bigboss' };
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await service.removeUser(removeUserDto);
      expect(mockRepository.delete).toHaveBeenCalledWith(removeUserDto.email);
    });
  });

  describe('findByEmail', () => {
    it('should return a single user by email', async () => {
      const mockUser: User = MockUser; 
      const dto: FindByEmailDto = { email: 'solid.snake@gmail.com' };

      mockRepository.findOneBy.mockResolvedValue(mockUser);

      const result = await service.findByEmail(dto);

      expect(mockRepository.findOneBy).toHaveBeenCalledWith(dto);

      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: '1', username: 'JohnDoe' }];
      mockRepository.find.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user by ID', async () => {
      const user = { id: '1', username: 'JohnDoe' };
      mockRepository.findOneBy.mockResolvedValue(user);

      const result = await service.findOne('1');
      expect(result).toEqual(user);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    });

    it('should return null if no user is found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findOne('999');
      expect(result).toBeNull();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: '999' });
    });
  });

});
