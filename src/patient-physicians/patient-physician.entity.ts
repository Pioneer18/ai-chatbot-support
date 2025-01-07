import { Patient } from '../patients/patients.entity';
import { Physician } from '../physicians/physician.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity('patient_physicians')
export class PatientPhysicians {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Patient)
    @JoinColumn()
    patient: Patient

    @OneToOne(() => Physician)
    @JoinColumn()
    physician: Physician
}