import { Request, Response } from "express";
import { UserServices } from "../services/UserServices";
import { UserRepository } from "../repositories/UserRepository";

export class UserController {
  private userSerivce: UserServices;

  constructor() {
    const userRepositoy = new UserRepository();
    this.userSerivce = new UserServices(userRepositoy);
  }

  async register(req: Request, res: Response): Promise<Response | void> {
    const { name, email, password } = req.body;
    const user = await this.userSerivce.registerUser(name, email, password);
    return res.json(user);
  }

  async login(req: Request, res: Response): Promise<Response | void> {
    const { email, password } = req.body;
    const user = await this.userSerivce.loginUser(email, password);
    return res.status(200).json({ message: "Login successful", user });
  }
}
