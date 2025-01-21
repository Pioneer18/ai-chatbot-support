import { Entity, Column, PrimaryColumn} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn({name: 'id', type: 'text'})
  id: string;

  @Column({ name: 'first_name', type: 'text' })
  firstName: string;

  @Column({ name: 'last_name', type: 'text' })
  lastName: string;

  @Column({name: 'phone_number', type: 'text',nullable: true })
  phoneNumber?: string

  @Column({ name: 'email', type: 'text' })
  email: string

  @Column({ name: 'password', type: 'text' })
  password: string

  @Column({ name: 'reset_password_token', type: 'text', nullable: true })
  resetPasswordToken?: string

  @Column({ name: 'reset_password_expires', type: 'text', nullable: true })
  resetPasswordExpires?: string

  @Column({ name: 'role', type: 'text' })
  role: string

  @Column({ name: 'profile_pic', type: 'text', nullable: true })
  profilePic?: string

  @Column({ name: 'is_active', type: 'boolean' })
  isActive: boolean
}
