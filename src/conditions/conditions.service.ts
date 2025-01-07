import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Condition } from './condition.entity';

@Injectable()
export class ConditionsService {
    constructor(
        @InjectRepository(Condition)
        private conditionsRepository
    ){}

    findAll(): Promise<Condition[]> {
        return this.conditionsRepository.find();
    }

    findOne(id: number): Promise<Condition | null> {
        return this.conditionsRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.conditionsRepository.delete(id);
    }
}
