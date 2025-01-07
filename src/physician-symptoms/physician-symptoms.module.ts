import { Module } from '@nestjs/common';
import { PhysicianSymptomsController } from './physician-symptoms.controller';
import { PhysicianSymptomsService } from './physician-symptoms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicianSymptoms } from './physician-symptoms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhysicianSymptoms])],
  controllers: [PhysicianSymptomsController],
  providers: [PhysicianSymptomsService]
})
export class PhysicianSymptomsModule {}
