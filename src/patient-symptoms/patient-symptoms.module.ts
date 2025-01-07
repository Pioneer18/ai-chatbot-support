import { Module } from '@nestjs/common';
import { PatientSymptomsController } from './patient-symptoms.controller';
import { PatientSymptomsService } from './patient-symptoms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientSymptoms } from './patient-symptom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientSymptoms])],
  controllers: [PatientSymptomsController],
  providers: [PatientSymptomsService]
})
export class PatientSymptomsModule {}
