import { UserRepository } from '../../domain/repositories/user.repository';
import { AuthError } from '../../domain/errors/auth.error';

export interface LogoutCommand {
  userId: string;
}

export class LogoutUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: LogoutCommand): Promise<void> {
    const user = await this.userRepository.findById(command.userId);

    if (!user) {
      throw new AuthError('User not found');
    }

    user.invalidateRefreshTokens();

    await this.userRepository.save(user);
  }
}
