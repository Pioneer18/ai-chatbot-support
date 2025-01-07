import { Test, TestingModule } from '@nestjs/testing';
import { SymptomConditionMappingService } from './symptom-condition-mapping.service';

describe('SymptomConditionMappingService', () => {
  let service: SymptomConditionMappingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SymptomConditionMappingService],
    }).compile();

    service = module.get<SymptomConditionMappingService>(SymptomConditionMappingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
