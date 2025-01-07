import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('medication')
export class Medication {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    name: string

    @Column('text')
    dosage: string

    @Column('text')
    type: string

    @Column('text')
    sideEffects: string
}