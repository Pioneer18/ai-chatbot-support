import { Test, TestingModule } from '@nestjs/testing';
import { PhysiciansService } from './physicians.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Physician } from './physician.entity';
import { Repository } from 'typeorm';

describe('PhysiciansService', () => {
  let service: PhysiciansService;
  let repository: Repository<Physician>;

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhysiciansService,
        {
          provide: getRepositoryToken(Physician),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PhysiciansService>(PhysiciansService);
    repository = module.get<Repository<Physician>>(getRepositoryToken(Physician));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of physicians', async () => {
      const physicians = [{ id: 1, name: 'Dr. Smith' }];
      mockRepository.find.mockResolvedValue(physicians);

      const result = await service.findAll();
      expect(result).toEqual(physicians);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single physician by ID', async () => {
      const physician = { id: 1, name: 'Dr. Smith' };
      mockRepository.findOneBy.mockResolvedValue(physician);

      const result = await service.findOne(1);
      expect(result).toEqual(physician);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if no physician is found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findOne(999);
      expect(result).toBeNull();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });

  describe('remove', () => {
    it('should delete a physician by ID', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should handle non-existent physician deletion gracefully', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await service.remove(999);
      expect(mockRepository.delete).toHaveBeenCalledWith(999);
    });
  });
});
