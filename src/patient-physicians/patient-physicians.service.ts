import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientPhysicians } from './patient-physician.entity';

@Injectable()
export class PatientPhysiciansService {
    constructor(
        @InjectRepository(PatientPhysicians)
        private patientPhysiciansRepository
    ) {}

    findAll(): Promise<PatientPhysicians[]> {
        return this.patientPhysiciansRepository.find();
    }

    findOne(id: number): Promise<PatientPhysicians | null> {
        return this.patientPhysiciansRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.patientPhysiciansRepository.delete(id);
    }
}
