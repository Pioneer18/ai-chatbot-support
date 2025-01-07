import { Test, TestingModule } from '@nestjs/testing';
import { PhysicianConditionsController } from './physician-conditions.controller';

describe('PhysicianConditionsController', () => {
  let controller: PhysicianConditionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysicianConditionsController],
    }).compile();

    controller = module.get<PhysicianConditionsController>(PhysicianConditionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
