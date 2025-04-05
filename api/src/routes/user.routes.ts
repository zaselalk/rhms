import { Router } from "express";
import { UserController } from "../controllers/UserController";
import catchAsync from "../util/catchAsync";

const UserRouter: Router = Router();
const userController = new UserController();

UserRouter.get("/", catchAsync(userController.getAllUsers));
// UserRouter.get("/:id", catchAsync(userController.getUserById))
// UserRouter.put("/:id", catchAsync(userController.updateUser));
// UserRouter.delete("/:id", catchAsync(userController.deleteUser));

export default UserRouter;
//
