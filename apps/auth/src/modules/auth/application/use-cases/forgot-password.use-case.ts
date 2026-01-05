import { UserRepository } from '../../domain/repositories/user.repository';

export interface ForgotPasswordCommand {
  email: string;
}

export class ForgotPasswordUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: ForgotPasswordCommand): Promise<void> {
    const user = await this.userRepository.findByEmailRaw(command.email);

    if (!user) {
      // 🔐 Seguridad: no revelar existencia
      return;
    }

    user.generatePasswordResetToken();

    await this.userRepository.save(user);
  }
}
