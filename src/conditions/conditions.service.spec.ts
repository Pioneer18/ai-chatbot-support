import { Test, TestingModule } from '@nestjs/testing';
import { ConditionsService } from './conditions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Condition } from './condition.entity';
import { Repository } from 'typeorm';

describe('ConditionsService', () => {
  let service: ConditionsService;
  let repository: Repository<Condition>;

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConditionsService,
        {
          provide: getRepositoryToken(Condition),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ConditionsService>(ConditionsService);
    repository = module.get<Repository<Condition>>(getRepositoryToken(Condition));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of conditions', async () => {
      const conditions = [{ id: 1, name: 'Diabetes' }];
      mockRepository.find.mockResolvedValue(conditions);

      const result = await service.findAll();
      expect(result).toEqual(conditions);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single condition', async () => {
      const condition = { id: 1, name: 'Diabetes' };
      mockRepository.findOneBy.mockResolvedValue(condition);

      const result = await service.findOne(1);
      expect(result).toEqual(condition);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if the condition is not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findOne(999);
      expect(result).toBeNull();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });

  describe('remove', () => {
    it('should delete a condition', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should handle non-existent condition deletion gracefully', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await service.remove(999);
      expect(mockRepository.delete).toHaveBeenCalledWith(999);
    });
  });
});
