import { ResetPasswordInterface } from "../interface/service/reset-password.interface";

export class ResetPasswordDTO implements ResetPasswordInterface {
    readonly resetPass: string;
    readonly confirmPass: string;
    readonly resetPassworToken: string;
}