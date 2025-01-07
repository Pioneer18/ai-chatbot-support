import { Module } from '@nestjs/common';
import { PatientPhysiciansController } from './patient-physicians.controller';
import { PatientPhysiciansService } from './patient-physicians.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientPhysicians } from './patient-physician.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientPhysicians])],
  controllers: [PatientPhysiciansController],
  providers: [PatientPhysiciansService]
})
export class PatientPhysiciansModule {}
