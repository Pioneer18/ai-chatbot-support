import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Symptom } from './symptom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SymptomsService {
    constructor(
        @InjectRepository(Symptom)
        private symptomsRepository: Repository<Symptom>
    ) {}

    findAll(): Promise<Symptom[]> {
        return this.symptomsRepository.find();
    }

    findOne(id: number): Promise<Symptom | null> {
        return this.symptomsRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.symptomsRepository.delete(id);
    }
}

