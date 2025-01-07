import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  @Column('text', {nullable: true})
  phone_number: string

  @Column('text')
  email: string

  @Column('text')
  password_hash: string

  @Column('text')
  role: string

  @Column('text', {nullable: true})
  profile_pic: string

  @Column('boolean')
  is_active: boolean
}
