import { createHash } from 'crypto';

export class RefreshTokenService {
  hash(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
