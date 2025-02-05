import { Patient } from "../patients/patients.entity";
import { Physician } from "../physicians/physician.entity";
import { AuditableEntity } from "../utilities/entities/auditable-entity";
import { Entity, JoinColumn, Column, PrimaryGeneratedColumn, OneToOne, Timestamp } from "typeorm";

@Entity('prescriptions')
export class Prescriptions {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Patient)
    @JoinColumn()
    patient: Patient

    @OneToOne(() => Physician)
    @JoinColumn()
    physician: Physician

    @Column('text') // should this be fk to medication table?
    medication: string

    @Column('text')
    dosage: string

    @Column('timestamp without time zone')
    start_date: Timestamp

    @Column('timestamp without time zone')
    end_date: Timestamp

    @Column('text', {nullable: true})
    remaining_refills: string

    @Column(() => AuditableEntity)
    audit: AuditableEntity
}