export class Password {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(rawPassword: string): Password {
    if (!this.isValid(rawPassword)) {
      throw new Error('Password does not meet security requirements');
    }

    return new Password(rawPassword);
  }

  getValue(): string {
    return this.value;
  }

  private static isValid(password: string): boolean {
    return password.length >= 8;
  }
}
