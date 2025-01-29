import { User } from "./enity/user.entity";

export interface UserInterface extends User{
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email: string;
    password: string;
    resetPasswordToken?: string ;
    resetPasswordExpires?: string;
    role: string;
    profilePic?: string;
    isActive: boolean;
}