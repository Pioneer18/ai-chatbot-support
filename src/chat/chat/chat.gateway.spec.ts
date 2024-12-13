import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { AiService } from '../../ai/ai.service';  // Make sure the path is correct

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let aiService: AiService;

  beforeEach(async () => {
    // Mock the AiService
    const aiServiceMock = {
      getResponse: jest.fn().mockResolvedValue('AI response'),  // Mock the getResponse method
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatGateway,
        { provide: AiService, useValue: aiServiceMock },  // Use the mock AiService
      ],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
    aiService = module.get<AiService>(AiService);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should call AiService.getResponse and return a response', async () => {
    const result = await gateway.handleMessage('Hello');
    expect(aiService.getResponse).toHaveBeenCalledWith('Hello');
    expect(result).toBe('AI response');
  });
});
