import { User } from 'src/users/user.entity';
import { AuditableEntity } from 'src/utilities/entities/auditable-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity('physicians')
export class Physician {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @Column()
    specialization: string

    @Column({nullable: true})
    location: string

    @Column("simple-array", {nullable: true})
    availability: string[]

    @Column(() => AuditableEntity)
    audit: AuditableEntity
}