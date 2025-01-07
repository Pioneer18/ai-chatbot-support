import { Physician } from '../physicians/physician.entity';
import { Symptom } from '../symptom-condition-mapping/symptom.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity('physician_symptoms')
export class PhysicianSymptoms {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Symptom)
    @JoinColumn()
    symptom: Symptom

    @OneToOne(() => Physician)
    @JoinColumn()
    physician: Physician
}