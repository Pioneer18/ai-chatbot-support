import { Condition } from 'src/conditions/condition.entity';
import { Physician } from 'src/physicians/physician.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity('physician_conditions')
export class PhysicianConditions {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Condition)
    @JoinColumn()
    condition: Condition

    @OneToOne(() => Physician)
    @JoinColumn()
    physician: Physician
}