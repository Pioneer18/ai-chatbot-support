import { Test, TestingModule } from '@nestjs/testing';
import { PhysiciansService } from './physicians.service';

describe('PhysiciansService', () => {
  let service: PhysiciansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysiciansService],
    }).compile();

    service = module.get<PhysiciansService>(PhysiciansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
