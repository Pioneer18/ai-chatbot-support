import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Role } from "./role.entity";
import { User } from "../../users/interface/enity/user.entity";

@Entity('user_role_mapping')
export class UserRoleMapping {
    @PrimaryColumn()
    userId: number;
    
    @PrimaryColumn()
    roleId: number;

    @OneToOne(() => Role)
    @JoinColumn({name: 'id'})
    role: Role

    @OneToOne(() => User)
    @JoinColumn({name: 'id'})
    user: User
}