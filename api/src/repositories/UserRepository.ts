import { Role, User } from "../models";

interface LoginUser extends User {
  role?: string;
}

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

  async findByEmail(email: string): Promise<LoginUser | null> {
    return User.findOne({
      where: {
        email,
      },
      attributes: ["id", "name", "email", "password"],
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "role"],
        },
      ],
    });
  }

  async getAllUsers(page: number, limit: number): Promise<User[]> {
    // maximum limit is 50
    if (limit > 50) limit = 50;
    const offset = (page - 1) * limit;
    return User.findAll({
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
    });
  }
}
