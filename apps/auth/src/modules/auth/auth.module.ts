import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

import { PrismaUserRepository } from './infrastructure/persistence/prisma/prisma-user.repository';

import { BcryptService } from './infrastructure/security/bcrypt.service';
import { JwtService } from './infrastructure/security/jwt.service';
import { RefreshTokenService } from './infrastructure/security/refresh-token.service';

@Module({
  providers: [
    PrismaService,

    // Repositories
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },

    // Security ports
    {
      provide: 'PasswordHasher',
      useClass: BcryptService,
    },
    {
      provide: 'TokenService',
      useFactory: () =>
        new JwtService(
          process.env.JWT_SECRET!,
          process.env.JWT_EXPIRES_IN!,
        ),
    },

    // Helpers
    RefreshTokenService,
  ],
  exports: [
    'UserRepository',
    'PasswordHasher',
    'TokenService',
    RefreshTokenService,
  ],
})
export class AuthModule {}
