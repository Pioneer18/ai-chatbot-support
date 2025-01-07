import { Test, TestingModule } from '@nestjs/testing';
import { PatientPhysiciansService } from './patient-physicians.service';

describe('PatientPhysiciansService', () => {
  let service: PatientPhysiciansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientPhysiciansService],
    }).compile();

    service = module.get<PatientPhysiciansService>(PatientPhysiciansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
