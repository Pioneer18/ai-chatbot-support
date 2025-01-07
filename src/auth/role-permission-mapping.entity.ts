import { Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Permission } from "./permission.entity";

@Entity('role_permission_mapping')
export class RolePermissionMapping {
    @PrimaryColumn()
    roleId: number;

    @PrimaryColumn()
    permissionId: number;

    @OneToOne(() => Role)
    @JoinColumn({name: 'id'})
    role: Role

    @OneToOne(() => Permission)
    @JoinColumn({name: 'id'})
    permission: Permission
}