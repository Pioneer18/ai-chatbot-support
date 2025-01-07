import { Test, TestingModule } from '@nestjs/testing';
import { SymptomConditionMappingService } from './symptom-condition-mapping.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SymptomConditionMapping } from './symptom-condition-mapping.entity';
import { Repository } from 'typeorm';

describe('SymptomConditionMappingService', () => {
  let service: SymptomConditionMappingService;
  let repository: Repository<SymptomConditionMapping>;

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SymptomConditionMappingService,
        {
          provide: getRepositoryToken(SymptomConditionMapping),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SymptomConditionMappingService>(SymptomConditionMappingService);
    repository = module.get<Repository<SymptomConditionMapping>>(
      getRepositoryToken(SymptomConditionMapping),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of symptom-condition mappings', async () => {
      const mappings = [{ id: 1, symptomId: 2, conditionId: 3 }];
      mockRepository.find.mockResolvedValue(mappings);

      const result = await service.findAll();
      expect(result).toEqual(mappings);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single symptom-condition mapping by ID', async () => {
      const mapping = { id: 1, symptomId: 2, conditionId: 3 };
      mockRepository.findOneBy.mockResolvedValue(mapping);

      const result = await service.findOne(1);
      expect(result).toEqual(mapping);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if no symptom-condition mapping is found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findOne(999);
      expect(result).toBeNull();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });

  describe('remove', () => {
    it('should delete a symptom-condition mapping by ID', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should handle non-existent symptom-condition mapping deletion gracefully', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await service.remove(999);
      expect(mockRepository.delete).toHaveBeenCalledWith(999);
    });
  });
});
