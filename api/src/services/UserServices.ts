import { UserNotFoundException } from "../exceptions/UserNotFound";
import { ValidationException } from "../exceptions/ValidatationError";
import User from "../models/user";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RoleRepository } from "../repositories/RoleRepository";

interface LoginUser {
  id: number;
  name: string;
  email: string;
  token: string;
  role: string | null;
}

export class UserServices {
  constructor(private userRepository: UserRepository) {}

  async registerUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const excitingUser = await this.userRepository.findByEmail(email);
    if (excitingUser) throw new UserNotFoundException("Email already in use");

    // console.log(password);

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.createUser(name, email, hashedPassword);
  }

  async loginUser(email: string, password: string): Promise<LoginUser> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new ValidationException("Invalid username or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    //why - https://security.stackexchange.com/questions/17816/username-and-or-password-invalid-why-do-websites-show-this-kind-of-message-i
    if (!isPasswordValid)
      throw new ValidationException("Invalid username or password");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
      role: user.role || null,
    };
  }

  async getAllUsers(page: number, limit: number): Promise<User[]> {
    const users = await this.userRepository.getAllUsers(page, limit);
    if (!users) throw new UserNotFoundException("No users found");
    return users;
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException("User not found");
    return user;
  }

  async addNewUser(
    full_name: string,
    role_id: number,
    email: string,
    password: string
  ): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new UserNotFoundException("Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.CreateUser(
      full_name,
      role_id,
      email,
      hashedPassword
    );
  }

  async updateUserFullNameById(
    id: number,
    full_name: string
  ): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException("User not found");

    return this.userRepository.updateUserFullNameById(id, full_name);
  }

  async updateUserRoleById(id: number, role_id: number): Promise<User | null> {
    // Check if the user exists
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException("User not found");

    // Check if the role exists
    const roleRepository = new RoleRepository();
    const role = await roleRepository.findById(role_id);

    // throw error if role not found
    if (!role) throw new UserNotFoundException("Role not found");

    // Check if the user already has the role
    if (user.roleId === role_id)
      throw new ValidationException("Role already assigned");

    return this.userRepository.updateUserRoleById(id, role_id);
  }

  async changeUserPassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): Promise<User | null> {
    console.log(`oldPassword, newPassword`, oldPassword, newPassword);
    const user = await this.userRepository.findByIdWithPassword(id);
    if (!user) throw new UserNotFoundException("User not found");

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) throw new ValidationException("Invalid old password");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.userRepository.changeUserPasswordById(id, hashedPassword);
  }

  async deleteUserById(id: number): Promise<boolean> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException("User not found");

    return this.userRepository.deleteUserById(id);
  }
}
