import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { Email } from '../../../domain/value-objects/email.vo';
import { PrismaService } from '../../../../prisma.service';
import { UserMapper } from '../mappers/user.mapper';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: Email): Promise<User | null> {
    const record = await this.prisma.user.findUnique({
      where: { email: email.getValue() },
      include: {
        credentials: true,
        sessions: true,
        resetTokens: true,
      },
    });

    if (!record) return null;

    return UserMapper.toDomain({
      user: record,
      credentials: record.credentials,
      sessions: record.sessions,
      resetTokens: record.resetTokens,
    });
  }

  async findById(id: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({
      where: { id },
      include: {
        credentials: true,
        sessions: true,
        resetTokens: true,
      },
    });

    if (!record) return null;

    return UserMapper.toDomain({
      user: record,
      credentials: record.credentials,
      sessions: record.sessions,
      resetTokens: record.resetTokens,
    });
  }

  async save(user: User): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      // 1️⃣ User
      await tx.user.upsert({
        where: { id: user.id },
        create: {
          id: user.id,
          email: user.email.getValue(),
        },
        update: {
          email: user.email.getValue(),
        },
      });

      // 2️⃣ Credentials
      if (user.passwordHash) {
        await tx.userCredentials.upsert({
          where: { userId: user.id },
          create: {
            userId: user.id,
            passwordHash: user.passwordHash,
          },
          update: {
            passwordHash: user.passwordHash,
          },
        });
      }

      // 3️⃣ Sessions (estrategia simple: borrar y recrear)
      await tx.session.deleteMany({ where: { userId: user.id } });

      for (const session of user.sessions) {
        await tx.session.create({
          data: {
            userId: user.id,
            refreshTokenHash: session.refreshTokenHash,
            expiresAt: session.expiresAt,
          },
        });
      }

      // 4️⃣ Password reset tokens
      await tx.passwordResetToken.deleteMany({ where: { userId: user.id } });

      for (const token of user.resetTokens) {
        await tx.passwordResetToken.create({
          data: {
            userId: user.id,
            token: token.token,
            expiresAt: token.expiresAt,
            usedAt: token.usedAt,
          },
        });
      }
    });
  }

  async findByPasswordResetToken(token: string): Promise<User | null> {
    const record = await this.prisma.passwordResetToken.findUnique({
      where: { token },
      include: {
        user: {
          include: {
            credentials: true,
            sessions: true,
            resetTokens: true,
          },
        },
      },
    });

    if (!record || record.usedAt || record.expiresAt < new Date()) {
      return null;
    }

    return UserMapper.toDomain({
      user: record.user,
      credentials: record.user.credentials,
      sessions: record.user.sessions,
      resetTokens: record.user.resetTokens,
    });
  }
}
