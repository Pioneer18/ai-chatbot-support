import { Test, TestingModule } from '@nestjs/testing';
import { PatientConditionsService } from './patient-conditions.service';

describe('PatientConditionsService', () => {
  let service: PatientConditionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientConditionsService],
    }).compile();

    service = module.get<PatientConditionsService>(PatientConditionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
