import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { AiService } from 'src/ai/ai.service';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly aiService: AiService) {}

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: string): Promise<string> {
    const aiResponse = await this.aiService.getResponse(message);
    return aiResponse;
  }
}
