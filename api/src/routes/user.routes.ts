import { Router } from "express";
import { UserController } from "../controllers/UserController";
import catchAsync from "../util/catchAsync";
import { protectRoute } from "../middleware/authjwt.middleware";
import {
  userFullNameUpdateValidation,
  userPasswordUpdateValidation,
  userRoleUpdateValidation,
  userDeleteValidation,
  userRegisterValidation,
} from "../validation/user";

const UserRouter: Router = Router();
const userController = new UserController();

UserRouter.get(
  "/",
  protectRoute("user:view"),
  catchAsync(userController.getAllUsers)
);

UserRouter.get(
  "/:id",
  protectRoute("user:view"),
  catchAsync(userController.getSingleUser)
);

UserRouter.post(
  "/",
  protectRoute("user:create"),
  userRegisterValidation,
  catchAsync(userController.addNewUser)
);

UserRouter.put(
  "/:id/name",
  protectRoute("user:edit"),
  userFullNameUpdateValidation,
  catchAsync(userController.updateUserFullNameById)
);

UserRouter.put(
  "/:id/role",
  protectRoute("user:edit"),
  userRoleUpdateValidation,
  catchAsync(userController.updateUserRoleById)
);

UserRouter.put(
  "/:id/password",
  protectRoute("user:edit"),
  userPasswordUpdateValidation,
  catchAsync(userController.changeUserPassword)
);

UserRouter.delete(
  "/:id",
  protectRoute("user:delete"),
  userDeleteValidation,
  catchAsync(userController.deleteUser)
);

export default UserRouter;
