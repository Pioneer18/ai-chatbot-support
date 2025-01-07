import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prescriptions } from './prescription.entity';
import { Medication } from '../prescription/medication.entity';
// Pharmacy API ?

@Injectable()
export class PrescriptionService {
    constructor(
        @InjectRepository(Prescriptions)
        private prescriptionsRepository,
        @InjectRepository(Medication)
        private medicationRepository
    ) {}

    // Create Prescriptions for Medication for a Patient, prescribed by a Physician
}
