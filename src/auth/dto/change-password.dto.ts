import { ChangePasswordInterface } from "../interface/service/change-password.interface";

export class ChangePasswordDto implements ChangePasswordInterface {
    readonly newPassword: string;
    readonly confirmPassword: string;
}