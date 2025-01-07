import { Module } from '@nestjs/common';
import { PrescriptionController } from './prescription.controller';
import { PrescriptionService } from './prescription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescriptions } from './prescription.entity';
import { Medication } from './medication.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prescriptions]),
    TypeOrmModule.forFeature([Medication])
  ],
  controllers: [PrescriptionController],
  providers: [PrescriptionService]
})
export class PrescriptionModule {}
