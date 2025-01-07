import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let jwtService: JwtService;

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateJwt', () => {
    it('should generate a JWT token with user ID', () => {
      const userId = '123';
      const token = 'mockJwtToken';
      mockJwtService.sign.mockReturnValue(token);

      const result = service.generateJwt(userId);

      expect(result).toBe(token);
      expect(mockJwtService.sign).toHaveBeenCalledWith({ userId });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: 1, username: 'JohnDoe' }];
      mockRepository.find.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user by ID', async () => {
      const user = { id: 1, username: 'JohnDoe' };
      mockRepository.findOneBy.mockResolvedValue(user);

      const result = await service.findOne(1);
      expect(result).toEqual(user);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if no user is found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findOne(999);
      expect(result).toBeNull();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });

  describe('remove', () => {
    it('should delete a user by ID', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should handle non-existent user deletion gracefully', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await service.remove(999);
      expect(mockRepository.delete).toHaveBeenCalledWith(999);
    });
  });
});
