import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhysicianSymptoms } from './physician-symptoms.entity';

@Injectable()
export class PhysicianSymptomsService {
    constructor(
        @InjectRepository(PhysicianSymptoms)
        private physicianSymptomsRepository
    ){}
        
    findAll(): Promise<PhysicianSymptoms[]> {
        return this.physicianSymptomsRepository.find();
    }

    findOne(id: number): Promise<PhysicianSymptoms | null> {
        return this.physicianSymptomsRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.physicianSymptomsRepository.delete(id);
    }
}
