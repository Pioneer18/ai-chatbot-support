import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('symptoms')
export class Symptom {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    name: string

    @Column('text', {nullable: true})
    description: string
}