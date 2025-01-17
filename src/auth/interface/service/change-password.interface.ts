export interface ChangePasswordInterface {
    readonly originalPassword: string;
    readonly newPassword: string;
    readonly confirmPassword: string;
}