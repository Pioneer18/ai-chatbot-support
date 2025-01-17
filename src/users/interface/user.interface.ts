export interface UserInterface {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email: string;
    password: string;
    resetPasswordToken?: string | null;
    resetPasswordExpires?: Date | string | null;
    role: string;
    profilePic?: string;
    isActive: boolean;
}