import { Module } from '@nestjs/common';
import { PhysiciansController } from './physicians.controller';
import { PhysiciansService } from './physicians.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Physician } from './physician.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Physician])],
  controllers: [PhysiciansController],
  providers: [PhysiciansService]
})
export class PhysiciansModule {}
