import { Condition } from '../symptom-condition-mapping/condition.entity';
import { Patient } from './patients.entity';
import { AuditableEntity } from '../utilities/entities/auditable-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity('patient_conditions')
export class PatientConditions {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Condition)
    @JoinColumn()
    condition: Condition

    @OneToOne(() => Patient)
    @JoinColumn()
    patient: Patient

    @Column('text')
    notes: string

    @Column(() => AuditableEntity)
    audit: AuditableEntity
}