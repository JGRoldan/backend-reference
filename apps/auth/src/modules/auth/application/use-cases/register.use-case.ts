import { UserRepository } from '../../domain/repositories/user.repository';
import { Email } from '../../domain/value-objects/email.vo';
import { Password } from '../../domain/value-objects/password.vo';
import { AuthError } from '../../domain/errors/auth.error';
import { User } from '../../domain/entities/user.entity';

export interface RegisterCommand {
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: RegisterCommand): Promise<{ userId: string }> {
    const email = Email.create(command.email);
    const password = Password.create(command.password);

    const exists = await this.userRepository.findByEmail(email);
    if (exists) {
      throw new AuthError('Email already in use');
    }

    const user = User.create({
      email,
      password,
    });

    await this.userRepository.save(user);

    return { userId: user.id };
  }
}
