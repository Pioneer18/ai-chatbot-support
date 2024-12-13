import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { AiService } from 'src/ai/ai.service';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly aiService: AiService) {}

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: string): Promise<string> {
    console.log(`client message: ${message}\n\nRetrieving ai response from the ai service...`)
    const aiResponse = await this.aiService.getResponse(message);
    return aiResponse;
  }
}
