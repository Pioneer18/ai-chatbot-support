import { ChangePasswordInterface } from "../interface/service/change-password.interface";

export class ChangePasswordDto implements ChangePasswordInterface {
    readonly originalPassword: string;
    readonly newPassword: string;
    readonly confirmPassword: string;
}