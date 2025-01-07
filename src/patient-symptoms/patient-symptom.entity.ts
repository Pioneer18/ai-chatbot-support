import { Patient } from 'src/patients/patients.entity';
import { Symptom } from 'src/symptoms/symptom.entity';
import { AuditableEntity } from 'src/utilities/entities/auditable-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Timestamp} from 'typeorm';

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

    @Column() // not need if we have created_at?
    date: Timestamp

    @Column()
    notes: string

    @Column(() => AuditableEntity)
    audit: AuditableEntity
}