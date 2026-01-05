import * as bcrypt from 'bcrypt';
import { PasswordHasher } from '../../domain/services/password-hasher'

export class BcryptService implements PasswordHasher {
  private readonly rounds = 10;

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.rounds);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
