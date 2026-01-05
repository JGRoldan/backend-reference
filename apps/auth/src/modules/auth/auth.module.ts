import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PrismaUserRepository } from './infrastructure/persistence/prisma/prisma-user.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: ['UserRepository'],
})
export class AuthModule {}
