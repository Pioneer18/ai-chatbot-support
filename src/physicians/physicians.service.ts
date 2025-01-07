import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Physician } from './physician.entity';

@Injectable()
export class PhysiciansService {
    constructor(
        @InjectRepository(Physician)
        private physiciansRepository
    ) {}

    findAll(): Promise<Physician[]> {
        return this.physiciansRepository.find();
    }

    findOne(id: number): Promise<Physician | null> {
        return this.physiciansRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
     await this.physiciansRepository.delete(id);
    }
}
