import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientConditions } from './patient-condition.entity';

@Injectable()
export class PatientConditionsService {
    constructor(
        @InjectRepository(PatientConditions)
        private patientConditionsRepository
    ) {}
    
    findAll(): Promise<PatientConditions[]> {
        return this.patientConditionsRepository.find();
    }

    findOne(id: number): Promise<PatientConditions | null> {
        return this.patientConditionsRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.patientConditionsRepository.delete(id);
    }
}
