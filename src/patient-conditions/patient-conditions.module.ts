import { Module } from '@nestjs/common';
import { PatientConditionsController } from './patient-conditions.controller';
import { PatientConditionsService } from './patient-conditions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientConditions } from './patient-condition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientConditions])],
  controllers: [PatientConditionsController],
  providers: [PatientConditionsService]
})
export class PatientConditionsModule {}
