import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('symptoms')
export class Symptom {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string
}