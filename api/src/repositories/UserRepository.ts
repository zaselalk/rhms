import User from "../models/user";

export class UserRepository {
  async createUser(
    name: string,
    email: string,
    hashedPassword: string
  ): Promise<User> {
    return User.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: {
        email,
      },
    });
  }
}
