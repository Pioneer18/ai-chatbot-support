import { Test, TestingModule } from '@nestjs/testing';
import { PhysicianConditionsService } from './physician-conditions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PhysicianConditions } from './physician-condition.entity';
import { Repository } from 'typeorm';

describe('PhysicianConditionsService', () => {
  let service: PhysicianConditionsService;
  let repository: Repository<PhysicianConditions>;

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhysicianConditionsService,
        {
          provide: getRepositoryToken(PhysicianConditions),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PhysicianConditionsService>(PhysicianConditionsService);
    repository = module.get<Repository<PhysicianConditions>>(getRepositoryToken(PhysicianConditions));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of physician conditions', async () => {
      const conditions = [{ id: 1, condition: 'Condition A' }];
      mockRepository.find.mockResolvedValue(conditions);

      const result = await service.findAll();
      expect(result).toEqual(conditions);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single physician condition by ID', async () => {
      const condition = { id: 1, condition: 'Condition A' };
      mockRepository.findOneBy.mockResolvedValue(condition);

      const result = await service.findOne(1);
      expect(result).toEqual(condition);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if no physician condition is found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findOne(999);
      expect(result).toBeNull();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });

  describe('remove', () => {
    it('should delete a physician condition by ID', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should handle non-existent physician condition deletion gracefully', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await service.remove(999);
      expect(mockRepository.delete).toHaveBeenCalledWith(999);
    });
  });
});
