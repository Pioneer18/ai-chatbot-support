import { Module } from '@nestjs/common';
import { MedicationController } from './medication.controller';
import { MedicationService } from './medication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medication } from './medication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medication])],
  controllers: [MedicationController],
  providers: [MedicationService]
})
export class MedicationModule {}
