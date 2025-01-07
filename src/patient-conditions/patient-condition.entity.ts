import { Condition } from 'src/conditions/condition.entity';
import { Patient } from 'src/patients/patients.entity';
import { AuditableEntity } from 'src/utilities/entities/auditable-entity';
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

    @Column('text') // not need if we have created at?
    date: string

    @Column('text')
    notes: string

    @Column(() => AuditableEntity)
    audit: AuditableEntity
}