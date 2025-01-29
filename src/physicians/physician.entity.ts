import { User } from '../users/interface/enity/user.entity';
import { AuditableEntity } from '../utilities/entities/auditable-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity('physicians')
export class Physician {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @Column('text')
    specialization: string

    @Column('text', {nullable: true})
    location: string

    @Column("simple-array", {nullable: true})
    availability: string[]

    @Column(() => AuditableEntity)
    audit: AuditableEntity
}