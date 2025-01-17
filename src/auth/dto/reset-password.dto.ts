import { ResetPasswordInterface } from "../interface/service/reset-password.interface";

export class ResetPasswordDTO implements ResetPasswordInterface {
    readonly newPassword: string;
    readonly confirmPassword: string;
    readonly resetPasswordToken: string;
}