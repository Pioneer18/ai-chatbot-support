import { Test, TestingModule } from '@nestjs/testing';
import { MedicationService } from './medication.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Medication } from './medication.entity';
import { Repository } from 'typeorm';

describe('MedicationService', () => {
  let service: MedicationService;
  let repository: Repository<Medication>;

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicationService,
        {
          provide: getRepositoryToken(Medication),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MedicationService>(MedicationService);
    repository = module.get<Repository<Medication>>(getRepositoryToken(Medication));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findAll and return all medications', async () => {
    const medications = [{ id: 1, name: 'Aspirin' }];
    mockRepository.find.mockResolvedValue(medications);

    const result = await service.findAll();
    expect(result).toEqual(medications);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should call findOne and return a single medication', async () => {
    const medication = { id: 1, name: 'Aspirin' };
    mockRepository.findOneBy.mockResolvedValue(medication);

    const result = await service.findOne(1);
    expect(result).toEqual(medication);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should call remove and delete a medication', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 });

    await service.remove(1);
    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });
});
