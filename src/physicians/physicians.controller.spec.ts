import { Test, TestingModule } from '@nestjs/testing';
import { PhysiciansController } from './physicians.controller';

describe('PhysiciansController', () => {
  let controller: PhysiciansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysiciansController],
    }).compile();

    controller = module.get<PhysiciansController>(PhysiciansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
