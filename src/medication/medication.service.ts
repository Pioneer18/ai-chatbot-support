import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medication } from './medication.entity';

@Injectable()
export class MedicationService {
    constructor(
        @InjectRepository(Medication)
        private medicationRepository
    ) {}
        
    findAll(): Promise<Medication[]> {
        return this.medicationRepository.find();
    }

    findOne(id: number): Promise<Medication | null> {
        return this.medicationRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.medicationRepository.delete(id);
    }
}
