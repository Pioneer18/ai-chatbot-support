import { Injectable } from "@nestjs/common";
import { FindUserInterface } from "../interface/service/find-user.interface";

@Injectable()
export class FindByEmailDto implements FindUserInterface {
    email: string;
}