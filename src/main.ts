import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, ChatModule],
})
export class AppModule {}