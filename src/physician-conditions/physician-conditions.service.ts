import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhysicianConditions } from './physician-condition.entity';

@Injectable()
export class PhysicianConditionsService {
    constructor(
        @InjectRepository(PhysicianConditions)
        private physicianConditionsRepository
    ){}
        
    findAll(): Promise<PhysicianConditions[]> {
        return this.physicianConditionsRepository.find();
    }

    findOne(id: number): Promise<PhysicianConditions | null> {
        return this.physicianConditionsRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.physicianConditionsRepository.delete(id);
    }
}
