import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from './patients.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from './patients.entity';
import { Repository } from 'typeorm';

describe('PatientsService', () => {
  let service: PatientsService;
  let repository: Repository<Patient>;

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        {
          provide: getRepositoryToken(Patient),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    repository = module.get<Repository<Patient>>(getRepositoryToken(Patient));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of patients', async () => {
      const patients = [{ id: 1, name: 'John Doe' }];
      mockRepository.find.mockResolvedValue(patients);

      const result = await service.findAll();
      expect(result).toEqual(patients);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single patient by ID', async () => {
      const patient = { id: 1, name: 'John Doe' };
      mockRepository.findOneBy.mockResolvedValue(patient);

      const result = await service.findOne(1);
      expect(result).toEqual(patient);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if no patient is found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findOne(999);
      expect(result).toBeNull();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });

  describe('remove', () => {
    it('should delete a patient by ID', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should handle non-existent patient deletion gracefully', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await service.remove(999);
      expect(mockRepository.delete).toHaveBeenCalledWith(999);
    });
  });
});
