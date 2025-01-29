export interface UpdateUserInterace {
    readonly firstName?: string;
    readonly lastName?: string;
    readonly email?: string;
    readonly phoneNumber?: string;
    readonly password?: string;
    readonly resetPasswordToken?: string;
    readonly resetPasswordToken_expires?: string;
    readonly role?: string;
    readonly profilePic?: string;
    readonly isActive?: boolean;
}