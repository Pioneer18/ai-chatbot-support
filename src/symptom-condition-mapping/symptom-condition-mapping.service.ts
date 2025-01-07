import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SymptomConditionMapping } from './symptom-condition-mapping.entity';

@Injectable()
export class SymptomConditionMappingService {
    constructor(
        @InjectRepository(SymptomConditionMapping)
        private symptomConditionMappingRepository
    ) {}

    findAll(): Promise<SymptomConditionMapping[]> {
        return this.symptomConditionMappingRepository.find();
    }

    findOne(id: number): Promise<SymptomConditionMapping | null> {
        return this.symptomConditionMappingRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.symptomConditionMappingRepository.delete(id);
    }
}
