import { Test, TestingModule } from '@nestjs/testing';
import { PatientPhysiciansController } from './patient-physicians.controller';

describe('PatientPhysiciansController', () => {
  let controller: PatientPhysiciansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientPhysiciansController],
    }).compile();

    controller = module.get<PatientPhysiciansController>(PatientPhysiciansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
