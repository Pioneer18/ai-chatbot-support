import { Test, TestingModule } from '@nestjs/testing';
import { PatientConditionsService } from './patient-conditions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PatientConditions } from './patient-condition.entity';
import { Repository } from 'typeorm';

describe('PatientConditionsService', () => {
  let service: PatientConditionsService;
  let repository: Repository<PatientConditions>;

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientConditionsService,
        {
          provide: getRepositoryToken(PatientConditions),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PatientConditionsService>(PatientConditionsService);
    repository = module.get<Repository<PatientConditions>>(
      getRepositoryToken(PatientConditions),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of patient conditions', async () => {
      const conditions = [{ id: 1, condition: 'Diabetes' }];
      mockRepository.find.mockResolvedValue(conditions);

      const result = await service.findAll();
      expect(result).toEqual(conditions);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single patient condition by ID', async () => {
      const condition = { id: 1, condition: 'Hypertension' };
      mockRepository.findOneBy.mockResolvedValue(condition);

      const result = await service.findOne(1);
      expect(result).toEqual(condition);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if no patient condition is found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findOne(999);
      expect(result).toBeNull();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });

  describe('remove', () => {
    it('should delete a patient condition by ID', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should handle non-existent patient condition deletion gracefully', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await service.remove(999);
      expect(mockRepository.delete).toHaveBeenCalledWith(999);
    });
  });
});
