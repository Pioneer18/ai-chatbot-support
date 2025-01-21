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
import { UserInterface } from '../interface/user.interface';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let jwtService: JwtService;

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    findOneByEmail: jest.fn(),
    findBy: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    jest.resetAllMocks();
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
        firstName: 'Revolver',
        lastName: 'Ocelot',
        phoneNumber: '0987654321',
        email: 'revolver.ocelot@gmail.com',
        password: '$2b$10$8wQbhNBfckfBsHeFRvY28.IEx4z6b024pnjYJDCca9D5K8QvEAEt.',
      };
      const mockUser: UserInterface = {
        id: '06fdc28e-7873-4bea-8153-6c37d5e012da',
        firstName: 'Revolver',
        lastName: 'Ocelot',
        phoneNumber: '0987654321',
        email: 'revolver.ocelot@gmail.com',
        password: '$2b$10$8wQbhNBfckfBsHeFRvY28.IEx4z6b024pnjYJDCca9D5K8QvEAEt.',
        resetPasswordToken: null,
        resetPasswordExpires: null,
        role: 'patient',
        profilePic: '',
        isActive: true
      }
      
      jest.spyOn(repository, 'findBy').mockResolvedValue([]);
      jest.spyOn(repository, 'create');
      jest.spyOn(repository, 'save').mockResolvedValue({
        id: mockUser.id,
        firstName: 'Revolver',
        lastName: 'Ocelot',
        phoneNumber: '0987654321',
        email: 'revolver.ocelot@gmail.com',
        password: '$2b$10$8wQbhNBfckfBsHeFRvY28.IEx4z6b024pnjYJDCca9D5K8QvEAEt.',
        resetPasswordToken: null,
        resetPasswordExpires: null,
        role: 'patient',
        profilePic: '',
        isActive: true
      })

      const result = await service.createUser(createUserDto);
      mockUser.id = result.id;
      expect(mockUser).toEqual(result);
      
    });

    it('should throw an error if user email already in the database', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'Johnny',
        lastName: 'Bravo',
        phoneNumber: '123456789',
        email: 'johnny.bravo@cartoonnetwork.com',
        password: '$2b$10$8wQbhNBfckfBsHeFRvY28.IEx4z6b024pnjYJDCca9D5K8QvEAEt.',
      };

      jest.spyOn(repository, 'findBy').mockResolvedValue([{
        id: '06fdc28e-7873-4bea-8153-6c37d5e012da',
        firstName: 'Johnny',
        lastName: 'Bravo',
        phoneNumber: '1234567890',
        email: 'johnny.bravo@cartoonnetwork.com',
        password: '$2b$10$8wQbhNBfckfBsHeFRvY28.IEx4z6b024pnjYJDCca9D5K8QvEAEt.',
        resetPasswordToken: null,
        resetPasswordExpires: null,
        role: 'patient',
        profilePic: '',
        isActive: true
      }])

      await expect(service.createUser(createUserDto)).rejects.toThrow('Error: user account already exists for johnny.bravo@cartoonnetwork.com')
    });
  });

  describe('updateUser', () => {
    it('should update a user and return it', async () => {
      const updateUserInterface: UpdateUserInterace = {
        firstName: 'Solid',
        lastName: 'Snake',
        phoneNumber: '123456789',
        email: 'solid.snake@gmail.com',
      };
      const mockUpdateResult: UpdateResult = { affected: 1, raw: [], generatedMaps: [] };
      mockRepository.update.mockResolvedValue({ affected: 1, raw: [], generatedMaps: [] });

      const result = await service.updateUser('9d3c5b62-d559-4960-ad1d-da083c089f0e', updateUserInterface);
      expect(result).toEqual(mockUpdateResult);
      expect(mockRepository.update).toHaveBeenCalledWith('9d3c5b62-d559-4960-ad1d-da083c089f0e', updateUserInterface);
      
    })
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
  
    describe('findByResetPasswordToken', () => {
      it('should find a user via the resetPasswordToken and return that user entity', async () => {
        const expectedResult: UserInterface = MockUser;
        const mockResetPassToken: string = 'mock-reset-password-token';
  
        mockRepository.findOneBy.mockResolvedValue(MockUser);
  
        const result = await service.findByResetPasswordToken(mockResetPassToken);
        console.log(result);
        expect(result).toEqual(expectedResult);
      });
    });

    it('should return null if no user is found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findOne('999');
      expect(result).toBeNull();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: '999' });
    });
  });

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
});
