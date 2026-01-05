import * as jwt from 'jsonwebtoken';
import { TokenService } from '../../domain/services/token-service'

export class JwtService implements TokenService {
  constructor(
    private readonly accessSecret: string,
    private readonly expiresIn: string,
  ) {}

  generateAccessToken(payload: { sub: string }): string {
    return jwt.sign(payload, this.accessSecret, {
      expiresIn: this.expiresIn,
    });
  }

  generateRefreshToken(): string {
    return crypto.randomUUID();
  }
}
