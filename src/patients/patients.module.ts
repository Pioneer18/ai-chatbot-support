import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patients.entity';
import { PatientPhysicians } from './patient-physician.entity';
import { PatientSymptoms } from './patient-symptom.entity';
import { PatientConditions } from './patient-condition.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    TypeOrmModule.forFeature([PatientPhysicians]),
    TypeOrmModule.forFeature([PatientSymptoms]),
    TypeOrmModule.forFeature([PatientConditions])
  ],
  controllers: [PatientsController],
  providers: [PatientsService]
})
export class PatientsModule {}
