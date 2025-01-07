import { Test, TestingModule } from '@nestjs/testing';
import { SymptomsService } from './symptoms.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Symptom } from './symptom.entity';
import { Repository } from 'typeorm';

describe('SymptomsService', () => {
  let service: SymptomsService;
  let repository: Repository<Symptom>;

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SymptomsService,
        {
          provide: getRepositoryToken(Symptom),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SymptomsService>(SymptomsService);
    repository = module.get<Repository<Symptom>>(getRepositoryToken(Symptom));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of symptoms', async () => {
      const symptoms = [{ id: 1, name: 'Cough' }];
      mockRepository.find.mockResolvedValue(symptoms);

      const result = await service.findAll();
      expect(result).toEqual(symptoms);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single symptom', async () => {
      const symptom = { id: 1, name: 'Cough' };
      mockRepository.findOneBy.mockResolvedValue(symptom);

      const result = await service.findOne(1);
      expect(result).toEqual(symptom);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if symptom is not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findOne(999);
      expect(result).toBeNull();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });

  describe('remove', () => {
    it('should delete a symptom', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should handle non-existent symptom deletion gracefully', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await service.remove(999);
      expect(mockRepository.delete).toHaveBeenCalledWith(999);
    });
  });
});
