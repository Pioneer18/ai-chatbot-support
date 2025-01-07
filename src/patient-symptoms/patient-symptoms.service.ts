import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientSymptoms } from './patient-symptom.entity';

@Injectable()
export class PatientSymptomsService {
    constructor(
        @InjectRepository(PatientSymptoms)
        private patientSymptomsRepository
    ) {}

    findAll(): Promise<PatientSymptoms[]> {
        return this.patientSymptomsRepository.find();
    }

    findOne(id: number): Promise<PatientSymptoms | null> {
        return this.patientSymptomsRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.patientSymptomsRepository.delete(id);
    }
}
