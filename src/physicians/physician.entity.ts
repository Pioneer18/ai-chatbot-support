import { User } from '../users/interface/enity/user.entity';
import { AuditableEntity } from '../utilities/entities/auditable-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity('physicians')
export class Physician extends AuditableEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @OneToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User

    @Column('text')
    specialization: string

    @Column('text', {nullable: true})
    location?: string

    @Column("simple-array", {nullable: true})
    availability?: string[]
}