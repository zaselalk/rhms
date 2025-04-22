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
    const user = await this.userService.registerUser(name, email, password);
    return res.json({
      message: "User registered successfully",
      data: {
        name: user.name,
        email: user.email,
      },
    });
  };

  addNewUser = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { full_name, role_id, email, password } = req.body;
    const user = await this.userService.addNewUser(
      full_name,
      role_id,
      email,
      password
    );
    return res.status(201).json({
      message: "User added successfully",
      status: 201,
      error: null,
      data: {
        full_name: user.name,
        role_id: user.roleId,
        email: user.email,
      },
    });
  };

  login = async (req: Request, res: Response): Promise<Response | void> => {
    const { email, password } = req.body;
    const user = await this.userService.loginUser(email, password);
    return res.status(200).json({ message: "Login successful", user });
  };

  getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const users = await this.userService.getAllUsers(page, limit);

    if (!users) throw new Error("No users found");
    return res.status(200).json({
      message: "Users fetched successfully",
      status: 200,
      page: page,
      limit: limit,
      data: users,
    });
  };
}
