export interface TokenService {
  generateAccessToken(payload: { sub: string }): string;
  generateRefreshToken(): string;
}
