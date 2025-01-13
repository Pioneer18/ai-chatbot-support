/**
 * **summary**: Interface for the return data of the auth.servie.validateUser() method
 */
export interface ValidateUserReturn {
    _id?: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email: string;
    role: string;
    profilePic?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date | string;
    __v?: number;
}
