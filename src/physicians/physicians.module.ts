import { Module } from '@nestjs/common';
import { PhysiciansController } from './physicians.controller';
import { PhysiciansService } from './physicians.service';

@Module({
  controllers: [PhysiciansController],
  providers: [PhysiciansService]
})
export class PhysiciansModule {}
