import { Request } from "express";
import { KeyJwtInterface } from "../interface/service/cookie-key-value.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ExtractKeyJwtUtil {
    constructor(){}

    public extract = async (req: Request): Promise<KeyJwtInterface> => {
        if (req) {
            const rawAuth: string = req.headers.cookie;
            return {
                jwt: rawAuth.split('=')[1],
                key: rawAuth.split('=')[0]
            }
        }
        throw new Error('No request object found');
    }
}