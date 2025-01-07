import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('conditions')
export class Condition {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    severityLevel: string
}