import { Test, TestingModule } from '@nestjs/testing';
import { PatientSymptomsController } from './patient-symptoms.controller';

describe('PatientSymptomsController', () => {
  let controller: PatientSymptomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientSymptomsController],
    }).compile();

    controller = module.get<PatientSymptomsController>(PatientSymptomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
