import { Test, TestingModule } from '@nestjs/testing';
import { SymptomConditionMappingController } from './symptom-condition-mapping.controller';

describe('SymptomConditionMappingController', () => {
  let controller: SymptomConditionMappingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SymptomConditionMappingController],
    }).compile();

    controller = module.get<SymptomConditionMappingController>(SymptomConditionMappingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
