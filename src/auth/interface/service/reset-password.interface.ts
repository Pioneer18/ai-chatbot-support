export interface ResetPasswordInterface {
    readonly newPassword: string;
    readonly confirmPassword: string;
    readonly resetPasswordToken: string;
}