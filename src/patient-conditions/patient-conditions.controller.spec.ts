import { Test, TestingModule } from '@nestjs/testing';
import { PatientConditionsController } from './patient-conditions.controller';

describe('PatientConditionsController', () => {
  let controller: PatientConditionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientConditionsController],
    }).compile();

    controller = module.get<PatientConditionsController>(PatientConditionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
