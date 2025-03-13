import { Request, Response } from "express";
import User from "../models/user";

class UserController {
  async register(req: Request, res: Response): Promise<Response | void> {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    return res.json(user);
  }

  async login(req: Request, res: Response): Promise<Response | void> {
    const { email, password } = req.body;

    const user = await User.findAll({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Invalid username or password !");
    }

    // compare password with entered password of the user

    return res.json(user);
  }
}

export default UserController;
