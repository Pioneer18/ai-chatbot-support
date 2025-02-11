import { User } from '../users/interface/enity/user.entity';
import { AuditableEntity } from '../utilities/entities/auditable-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity('patients')
export class Patient extends AuditableEntity {
    @PrimaryGeneratedColumn('increment')
    id: number
    
    @OneToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User
    
    @Column({name: 'date_of_birth', type: 'date'})
    dateOfBirth: Date
    
    @Column('text')
    gender: string
    
    @Column('text')
    height: string

    @Column({name: 'insurance_id', type: 'text', nullable: true})
    insuranceId?: string
}