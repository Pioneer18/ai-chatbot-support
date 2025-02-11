import { Patient } from "../patients/patients.entity";
import { Physician } from "../physicians/physician.entity";
import { AuditableEntity } from "../utilities/entities/auditable-entity";
import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, Timestamp, ManyToMany, ManyToOne } from "typeorm";

@Entity('prescriptions')
export class Prescriptions extends AuditableEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @ManyToOne(() => Patient)
    @JoinColumn({name: 'patient_id'})
    patientId: Patient

    @ManyToOne(() => Physician)
    @JoinColumn({name: 'physician_id'})
    physicianId: Physician

    @Column('text') // should this be fk to medication table?
    medication: string

    @Column('text')
    dosage: string

    @Column({name: 'start_date', type: 'timestamp'})
    startDate: Date

    @Column({name: 'end_date', type: 'timestamp'})
    endDate: Date

    @Column({name: 'remaining_refills', type: 'int', nullable: true})
    remainingRefills: number
}