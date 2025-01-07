import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patients.entity';

@Injectable()
export class PatientsService {
    constructor(
        @InjectRepository(Patient)
        private patientsRepository
    ){}

    findAll(): Promise<Patient[]> {
        return this.patientsRepository.find();
    }

    findOne(id: number): Promise<Patient | null> {
        return this.patientsRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.patientsRepository.delete(id);
    }
}
