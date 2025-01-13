export interface UserInterface {
    id: string;
    first_name: string;
    last_name: string;
    phoneNumber?: string;
    email: string;
    password_hash: string;
    resetPasswordToken?: string | null;
    resetPasswordExpires?: Date | string | null;
    role: string;
    profilePic?: string;
    is_active: boolean;
}