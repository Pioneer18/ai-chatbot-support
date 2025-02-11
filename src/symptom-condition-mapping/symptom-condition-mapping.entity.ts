import { Condition } from './condition.entity';
import { Symptom } from './symptom.entity';
import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn, ManyToOne} from 'typeorm';

@Entity('symptom_condition_mapping')
export class SymptomConditionMapping {
    @PrimaryColumn({ name: 'symptom_id', type: 'int' })
    symptomId: number;

    @PrimaryColumn({ name: 'condition_id', type: 'int' })
    conditionId: number;

    @ManyToOne(() => Symptom)
    symptom: Symptom;

    @ManyToOne(() => Condition)
    condition: Condition;

    @Column({ name: 'severity_level', type: 'text', nullable: true })
    severityLevel?: string;

    @Column({ name: 'recommended_action', type: 'text', nullable: true })
    recommendedAction?: string;
}