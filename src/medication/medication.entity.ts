import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('medication')
export class Medication {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    dosage: string

    @Column()
    type: string

    @Column()
    sideEffects: string
}