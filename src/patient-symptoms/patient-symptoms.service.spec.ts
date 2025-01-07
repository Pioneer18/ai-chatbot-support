import { Test, TestingModule } from '@nestjs/testing';
import { PatientSymptomsService } from './patient-symptoms.service';

describe('PatientSymptomsService', () => {
  let service: PatientSymptomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientSymptomsService],
    }).compile();

    service = module.get<PatientSymptomsService>(PatientSymptomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
