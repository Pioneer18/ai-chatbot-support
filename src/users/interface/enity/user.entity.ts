import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  @Column('text', {nullable: true})
  phone_number?: string

  @Column('text')
  email: string

  @Column('text')
  password_hash: string

  @Column('text', {nullable: true})
  reset_password_token?: string

  @Column('text', {nullable: true})
  reset_password_expires?: string

  @Column('text')
  role: string

  @Column('text', {nullable: true})
  profile_pic?: string

  @Column('boolean')
  is_active: boolean
}
