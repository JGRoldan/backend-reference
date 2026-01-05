import { UserRepository } from '../../domain/repositories/user.repository';
import { Email } from '../../domain/value-objects/email.vo';
import { Password } from '../../domain/value-objects/password.vo';
import { InvalidCredentialsError } from '../../domain/errors/invalid-credentials.error';

export interface LoginCommand {
  email: string;
  password: string;
}

export class LoginUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: LoginCommand) {
    const email = Email.create(command.email);
    const password = Password.create(command.password);

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatches = user.passwordMatches(password);

    if (!passwordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      userId: user.id,
    };
  }
}
