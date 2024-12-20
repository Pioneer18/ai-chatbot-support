import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';

describe('AiService', () => {
  let service: AiService;

  beforeEach(async () => {
    process.env.OPENAI_API_KEY = 'fake-api-key'

    const module: TestingModule = await Test.createTestingModule({
      providers: [AiService],
    }).compile();

    service = module.get<AiService>(AiService);
  });

  afterEach(() => {
    delete process.env.OPENAI_API_KEY;
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
}); 
