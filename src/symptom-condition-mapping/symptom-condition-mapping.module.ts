import { Module } from '@nestjs/common';
import { SymptomConditionMappingController } from './symptom-condition-mapping.controller';
import { SymptomConditionMappingService } from './symptom-condition-mapping.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SymptomConditionMapping } from './symptom-condition-mapping.entity';
import { Symptom } from './symptom.entity';
import { Condition } from './condition.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SymptomConditionMapping]),
    TypeOrmModule.forFeature([Symptom]),
    TypeOrmModule.forFeature([Condition])
  ],
  controllers: [SymptomConditionMappingController],
  providers: [SymptomConditionMappingService]
})
export class SymptomConditionMappingModule {}
