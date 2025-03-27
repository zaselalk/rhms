import { UserNotFoundException } from "../exceptions/UserNotFound";
import { ValidationException } from "../exceptions/ValidatationError";
import User from "../models/user";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginUser {
  id: number;
  name: string;
  email: string;
  token: string;
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
    console.log("Generated hash for '1234':", hashedPassword);
    return this.userRepository.createUser(name, email, hashedPassword);
  }

  async loginUser(email: string, password: string): Promise<LoginUser> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new ValidationException("Invalid username or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password validation result:", isPasswordValid);

    //why - https://security.stackexchange.com/questions/17816/username-and-or-password-invalid-why-do-websites-show-this-kind-of-message-i
    if (!isPasswordValid)
      throw new ValidationException("Invalid username or password");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}
