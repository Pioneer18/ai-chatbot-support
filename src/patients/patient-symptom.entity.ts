import { Patient } from '../patients/patients.entity';
import { Symptom } from '../symptom-condition-mapping/symptom.entity';
import { AuditableEntity } from '../utilities/entities/auditable-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity('patient_symptoms')
export class PatientSymptoms {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Symptom)
    @JoinColumn()
    symptom: Symptom

    @OneToOne(() => Patient)
    @JoinColumn()
    patient: Patient

    @Column('text')
    notes: string

    @Column(() => AuditableEntity)
    audit: AuditableEntity
}