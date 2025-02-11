import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('conditions')
export class Condition {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({name: 'name', type: 'text'})
    name: string

    @Column({name: 'description', type: 'text'})
    description: string

    @Column({name: 'severity_level', type: 'text'})
    severityLevel: string
}