import { Test, TestingModule } from '@nestjs/testing';
import { PhysicianSymptomsService } from './physician-symptoms.service';

describe('PhysicianSymptomsService', () => {
  let service: PhysicianSymptomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysicianSymptomsService],
    }).compile();

    service = module.get<PhysicianSymptomsService>(PhysicianSymptomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
