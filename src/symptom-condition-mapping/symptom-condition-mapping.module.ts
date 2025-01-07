import { Module } from '@nestjs/common';
import { SymptomConditionMappingController } from './symptom-condition-mapping.controller';
import { SymptomConditionMappingService } from './symptom-condition-mapping.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SymptomConditionMapping } from './symptom-condition-mapping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SymptomConditionMapping])],
  controllers: [SymptomConditionMappingController],
  providers: [SymptomConditionMappingService]
})
export class SymptomConditionMappingModule {}
