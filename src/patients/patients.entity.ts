import { User } from '../users/interface/enity/user.entity';
import { AuditableEntity } from '../utilities/entities/auditable-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn()
    id: number
    
    @OneToOne(() => User)
    @JoinColumn()
    user: User
    
    @Column('text')
    date_of_birth: string
    
    @Column('text')
    gender: string
    
    @Column('text') // e.g. 5.11 is 5 feet 11 inches
    height: string

    @Column('text', {nullable: true})
    insurance_id: string
    
    @Column(() => AuditableEntity)
    audit: AuditableEntity
    
}