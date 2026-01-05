import { UserRepository } from '../../domain/repositories/user.repository';
import { AuthError } from '../../domain/errors/auth.error';

export interface RefreshTokenCommand {
  userId: string;
  refreshToken: string;
}

export class RefreshTokenUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: RefreshTokenCommand): Promise<{ userId: string }> {
    const user = await this.userRepository.findById(command.userId);

    if (!user) {
      throw new AuthError('Invalid refresh token');
    }

    const isValid = user.isRefreshTokenValid(command.refreshToken);

    if (!isValid) {
      throw new AuthError('Invalid refresh token');
    }

    return { userId: user.id };
  }
}
