import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionService } from './prescription.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Prescriptions } from './prescription.entity';
import { Repository } from 'typeorm';
import { Medication } from './medication.entity';

describe('PrescriptionService', () => {
  let service: PrescriptionService;
  let prescriptionsRepository: Repository<Prescriptions>
  let medicationRepository: Repository<Medication>

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrescriptionService,
        {
          provide: getRepositoryToken(Prescriptions),
          useValue: mockRepository
        },
        {
          provide: getRepositoryToken(Medication),
          useValue: mockRepository
        }
      ],
    }).compile();

    service = module.get<PrescriptionService>(PrescriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
