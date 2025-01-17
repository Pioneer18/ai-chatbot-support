import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text', {nullable: true})
  phoneNumber?: string

  @Column('text')
  email: string

  @Column('text')
  password: string

  @Column('text', {nullable: true})
  resetPasswordToken?: string

  @Column('text', {nullable: true})
  resetPasswordExpires?: string

  @Column('text')
  role: string

  @Column('text', {nullable: true})
  profilePic?: string

  @Column('boolean')
  isActive: boolean
}
