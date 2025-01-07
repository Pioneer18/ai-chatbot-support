import { Patient } from "src/patients/patients.entity";
import { Physician } from "src/physicians/physician.entity";
import { AuditableEntity } from "src/utilities/entities/auditable-entity";
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

    @Column() // should this be fk to medication table?
    medication: string

    @Column()
    start_date: Timestamp

    @Column()
    end_date: Timestamp

    @Column({nullable: true})
    remaining_refills: string

    @Column(() => AuditableEntity)
    audit: AuditableEntity
}