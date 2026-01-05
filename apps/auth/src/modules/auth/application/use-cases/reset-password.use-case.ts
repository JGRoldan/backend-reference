import { UserRepository } from '../../domain/repositories/user.repository';
import { Password } from '../../domain/value-objects/password.vo';
import { AuthError } from '../../domain/errors/auth.error';

export interface ResetPasswordCommand {
  token: string;
  newPassword: string;
}

export class ResetPasswordUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: ResetPasswordCommand): Promise<void> {
    const user = await this.userRepository.findByPasswordResetToken(
      command.token,
    );

    if (!user) {
      throw new AuthError('Invalid or expired reset token');
    }

    const newPassword = Password.create(command.newPassword);

    user.resetPassword(newPassword);

    await this.userRepository.save(user);
  }
}
