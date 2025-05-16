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

    const users = await this.userService.getAllUsers(page, limit, req.user);

    if (!users) throw new Error("No users found");
    return res.status(200).json({
      message: "Users fetched successfully",
      status: 200,
      page: page,
      limit: limit,
      data: users,
    });
  };

  getSingleUser = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { id } = req.params;
    const user = await this.userService.getUserById(parseInt(id));
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
        error: null,
        data: null,
      });
    }
    return res.status(200).json({
      message: "User fetched successfully",
      status: 200,
      error: null,
      data: user,
    });
  };

  updateUserFullNameById = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { id } = req.params;
    const { full_name } = req.body;
    const user = await this.userService.updateUserFullNameById(
      parseInt(id),
      full_name
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
        error: null,
        data: null,
      });
    }
    return res.status(200).json({
      message: "User updated successfully",
      status: 200,
      error: null,
      data: user,
    });
  };

  updateUserRoleById = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { id } = req.params;
    const { role_id } = req.body;
    const user = await this.userService.updateUserRoleById(
      parseInt(id),
      role_id
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
        error: null,
        data: null,
      });
    }
    return res.status(200).json({
      message: "User updated successfully",
      status: 200,
      error: null,
      data: user,
    });
  };

  changeUserPassword = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { id } = req.params;
    const { password: oldPassword, new_password: newPassword } = req.body;

    // if the password is same
    if (oldPassword === newPassword) {
      return res.status(400).json({
        message: "New password cannot be the same as the old password",
        status: 400,
        error: null,
        data: null,
      });
    }

    const user = await this.userService.changeUserPassword(
      parseInt(id),
      oldPassword,
      newPassword
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
        error: null,
        data: null,
      });
    }
    return res.status(200).json({
      message: "User password updated successfully",
      status: 200,
      error: null,
      data: user,
    });
  };

  deleteUser = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { id } = req.params;
    const deleted = await this.userService.deleteUserById(parseInt(id));

    if (!deleted) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
        error: null,
        data: null,
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      status: 200,
      error: null,
      data: null,
    });
  };

  checkAuthStatus = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        status: 401,
        error: null,
        data: null,
      });
    }

    try {
      const userStatus = await this.userService.verifyToken(token);
      return res.status(200).json({
        message: "Token is valid",
        status: 200,
        error: null,
        data: userStatus,
      });
    } catch (error) {
      return res.status(401).json({
        message: "Invalid token",
        status: 401,
        error: (error as Error).message,
        data: null,
      });
    }
  };
}
