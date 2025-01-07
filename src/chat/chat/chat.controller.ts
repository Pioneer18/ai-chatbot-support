// src/chat/chat.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt.auth-guard';

@Controller('chat')
export class ChatController {
  @Get('secure-endpoint')
  @UseGuards(JwtAuthGuard)
  getSecureData() {
    return { message: 'This route is protected' };
  }
}
