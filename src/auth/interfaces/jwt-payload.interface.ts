// src/auth/jwt-payload.interface.ts
export interface JwtPayload {
  firstName: string;
  lastName: string;
  id: number; // Typically, the userId
}

