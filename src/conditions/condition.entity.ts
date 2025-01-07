import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('conditions')
export class Condition {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    name: string

    @Column('text')
    description: string

    @Column('text')
    severityLevel: string
}