import { Op } from "sequelize";
import { Role, User } from "../models";

interface LoginUser extends User {
  role?: string;
}

export interface UserWithPermission extends User {
  role?: {
    id: number;
    role: string;
    permission: string[];
  };
}

export class UserRepository {
  async createUser(
    name: string,
    email: string,
    hashedPassword: string,
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

  async findByEmailWithPermission(
    email: string,
  ): Promise<UserWithPermission | null> {
    return User.findOne<UserWithPermission>({
      where: {
        email,
      },
      attributes: ["id", "name", "email", "password"],
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "role", "permission"],
        },
      ],
    });
  }

  async findById(id: number): Promise<User | null> {
    return User.findByPk(id, {
      attributes: ["id", "name", "email"],
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "role", "permission"],
        },
      ],
    });
  }

  async findByIdWithPassword(id: number): Promise<LoginUser | null> {
    return User.findByPk(id, {
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

  async getAllUsers(page: number, limit: number, user: any): Promise<User[]> {
    // maximum limit is 50
    if (limit > 50) limit = 50;
    const offset = (page - 1) * limit;
    return User.findAll({
      where: {
        email: {
          [Op.not]: user.email, // Exclude the logged-in user
        },
      },

      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "role", "permission"],
        },
      ],
    });
  }

  async CreateUser(
    name: string,
    roleId: number,
    email: string,
    password: string,
    phone_number: string,
  ): Promise<User> {
    return User.create({
      name,
      roleId,
      email,
      password,
      phone_number,
    });
  }

  async updateUserFullNameById(
    id: number,
    full_name: string,
  ): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;

    user.name = full_name;
    await user.save();
    return user;
  }

  async updateUserRoleById(id: number, roleId: number): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;

    user.roleId = roleId;
    await user.save();
    await user.reload(); // Reload the user to get the updated data
    return user;
  }

  /**
   * Change user password by id, This method should provide the hashed password
   */
  async changeUserPasswordById(
    id: number,
    hashedPassword: string,
  ): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;

    user.password = hashedPassword;
    await user.save();
    return user;
  }

  async deleteUserById(id: number): Promise<boolean> {
    const deletedRows = await User.destroy({ where: { id } });
    return deletedRows > 0;
  }

  async findUsersByRoleId(roleId: number): Promise<User[]> {
    return User.findAll({
      where: {
        roleId,
      },
      attributes: ["id", "name", "email"],
    });
  }
}
