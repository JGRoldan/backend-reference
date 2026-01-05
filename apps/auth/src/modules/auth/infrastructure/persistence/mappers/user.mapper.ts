import { User } from '../../../domain/entities/user.entity';
import { Email } from '../../../domain/value-objects/email.vo';

export class UserMapper {
  static toDomain(raw: {
    user: {
      id: string;
      email: string;
    };
    credentials?: {
      passwordHash: string;
    } | null;
    sessions?: {
      refreshTokenHash: string;
      expiresAt: Date;
    }[];
    resetTokens?: {
      token: string;
      expiresAt: Date;
      usedAt: Date | null;
    }[];
  }): User {
    return User.restore({
      id: raw.user.id,
      email: Email.create(raw.user.email),
      passwordHash: raw.credentials?.passwordHash ?? null,
      sessions: raw.sessions ?? [],
      resetTokens: raw.resetTokens ?? [],
    });
  }
}

