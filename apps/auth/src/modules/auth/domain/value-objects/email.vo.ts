export class Email {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(email: string): Email {
    if (!this.isValid(email)) {
      throw new Error('Invalid email format');
    }

    return new Email(email.toLowerCase());
  }

  getValue(): string {
    return this.value;
  }

  private static isValid(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
