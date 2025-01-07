import { Patient } from "../patients/patients.entity";
import { Physician } from "../physicians/physician.entity";
import { AuditableEntity } from "../utilities/entities/auditable-entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Patient)
    @JoinColumn()
    patient: Patient

    @OneToOne(() => Physician)
    @JoinColumn()
    physician: Physician

    @Column('timestamp without time zone')
    scheduled_time: Date

    @Column('text')
    status: string

    @Column(() => AuditableEntity)
    audit: AuditableEntity
}