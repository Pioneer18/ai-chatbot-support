import { Test, TestingModule } from '@nestjs/testing';
import { PhysicianConditionsService } from './physician-conditions.service';

describe('PhysicianConditionsService', () => {
  let service: PhysicianConditionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysicianConditionsService],
    }).compile();

    service = module.get<PhysicianConditionsService>(PhysicianConditionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
