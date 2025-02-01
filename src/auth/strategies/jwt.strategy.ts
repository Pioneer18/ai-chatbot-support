
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayloadInterface } from '../interface/jwt-payload.interface';
/**
 * **summary**: [**Passport Jwt-Strategy**](http://www.passportjs.org/packages/passport-jwt/)
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // read JWT from the Cookie Header
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        console.log(request?.cookies?.Authentication);
        return request?.cookies?.Authentication;
      }]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * **summary**: Return the decoded payload of the JWT
   * @param payload
   */
  validate = async (payload: any): Promise<JwtPayloadInterface> => {
    console.log(`JwtStrategy Payload: ${JSON.stringify(payload)}`);
    return { userid: payload.id, firstName: payload.firstName, lastName: payload.lastName, email: payload.email };
  }
}
