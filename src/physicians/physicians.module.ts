import { Module } from '@nestjs/common';
import { PhysiciansController } from './physicians.controller';
import { PhysiciansService } from './physicians.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Physician } from './physician.entity';
import { PhysicianConditions } from './physician-condition.entity';
import { PhysicianSymptoms } from './physician-symptoms.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Physician]),
    TypeOrmModule.forFeature([PhysicianConditions]),
    TypeOrmModule.forFeature([PhysicianSymptoms])
  ],
  controllers: [PhysiciansController],
  providers: [PhysiciansService]
})
export class PhysiciansModule {}
