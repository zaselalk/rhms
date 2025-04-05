import Role from "../models/role";
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

  async getAllUsers(page: number, limit: number): Promise<User[]> {
    // maximum limit is 50
    if (limit > 50) limit = 50;
    const offset = (page - 1) * limit;
    return User.findAll({
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
      // include: [
      //   {
      //     model: Role,
      //     as: "role",
      //     attributes: ["id", "name"],
      //   },
      // ],
    });
  }
}
