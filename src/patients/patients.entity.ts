import { User } from '../users/interface/enity/user.entity';
import { AuditableEntity } from '../utilities/entities/auditable-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Timestamp} from 'typeorm';

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn('increment')
    id: number
    
    @OneToOne(() => User)
    @JoinColumn()
    user: User
    
    @Column('text')
    date_of_birth: string
    
    @Column('text')
    gender: string
    
    @Column('text')
    height: string

    @Column({name: 'insurance_id', type: 'text', nullable: true})
    insuranceId: string
    
    @Column(() => AuditableEntity)
    audit: AuditableEntity
    
    @Column({ name: 'created_at', type: 'text' })
    createdAt: Timestamp

    @Column({ name: 'updated_at', type: 'text' })
    updatedAt: Timestamp
}