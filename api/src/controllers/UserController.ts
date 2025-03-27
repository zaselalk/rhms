import { Request, Response } from "express";
import { UserServices } from "../services/UserServices";
import { UserRepository } from "../repositories/UserRepository";

export class UserController {
  private userService: UserServices;

  constructor() {
    const userRepositoy = new UserRepository();
    this.userService = new UserServices(userRepositoy);
  }

  register = async (req: Request, res: Response): Promise<Response | void> => {
    const { name, email, password } = req.body;
    // console.log(this.userService);
    const user = await this.userService.registerUser(name, email, password);
    return res.json(user);
  };

  login = async (req: Request, res: Response): Promise<Response | void> => {
    const { email, password } = req.body;
    const user = await this.userService.loginUser(email, password);
    return res.status(200).json({ message: "Login successful", user });
  };
}
