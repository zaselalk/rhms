import { Router } from "express";
import { UserController } from "../controllers/UserController";
import catchAsync from "../util/catchAsync";
import { protectRoute } from "../middleware/authjwt.middleware";

const UserRouter: Router = Router();
const userController = new UserController();

UserRouter.get(
  "/",
  protectRoute("user:view"),
  catchAsync(userController.getAllUsers)
);

UserRouter.post(
  "/",
  protectRoute("user:create"),
  catchAsync(userController.addNewUser)
);

// UserRouter.get("/:id", catchAsync(userController.getUserById))
// UserRouter.put("/:id", catchAsync(userController.updateUser));
// UserRouter.delete("/:id", catchAsync(userController.deleteUser));

export default UserRouter;
//
