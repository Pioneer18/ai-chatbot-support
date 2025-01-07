import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(Appointment)
        private appointmentsRepository
    ) {}
    
    findAll(): Promise<Appointment[]> {
        return this.appointmentsRepository.find();
    }

    findOne(id: number): Promise<Appointment | null> {
        return this.appointmentsRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.appointmentsRepository.delete(id);
    }
}
