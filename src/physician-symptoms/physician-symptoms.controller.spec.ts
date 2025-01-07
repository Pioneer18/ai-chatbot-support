import { Test, TestingModule } from '@nestjs/testing';
import { PhysicianSymptomsController } from './physician-symptoms.controller';

describe('PhysicianSymptomsController', () => {
  let controller: PhysicianSymptomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysicianSymptomsController],
    }).compile();

    controller = module.get<PhysicianSymptomsController>(PhysicianSymptomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
