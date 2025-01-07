import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { AiService } from '../ai/ai.service';

@Module({
  providers: [ChatGateway, AiService],
})
export class ChatModule {}
