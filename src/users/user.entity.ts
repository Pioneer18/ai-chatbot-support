import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({nullable: true})
  phone_number: string

  @Column()
  email: string

  @Column()
  password_hash: string

  @Column()
  role: string

  @Column({nullable: true})
  profile_pic: string

  @Column()
  is_active: boolean
}
