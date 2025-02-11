import { Patient } from "../patients/patients.entity";
import { Physician } from "../physicians/physician.entity";
import { AuditableEntity } from "../utilities/entities/auditable-entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('appointments')
export class Appointment extends AuditableEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @ManyToOne(() => Patient)
    @JoinColumn({name: 'patient_id'})
    patient: Patient

    @ManyToOne(() => Physician)
    @JoinColumn({name: 'physician_id'})
    physician: Physician

    @Column({name: 'scheduled_time', type: 'timestamp'})
    scheduledTime: Date

    @Column('text')
    status: string
}