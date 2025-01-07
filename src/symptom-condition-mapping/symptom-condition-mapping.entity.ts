import { Condition } from './condition.entity';
import { Symptom } from './symptom.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity('symptom_condition_mapping')
export class SymptomConditionMapping {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Symptom)
    @JoinColumn()
    symptom: Symptom

    @OneToOne(() => Condition)
    @JoinColumn()
    condition: Condition

    @Column('text', {nullable: true})
    severityLevel: string

    @Column('text', {nullable: true})
    recommended_action: string
}