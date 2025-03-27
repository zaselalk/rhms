import { Router } from "express";
import { UserController } from "../controllers/UserController";
import catchAsync from "../util/catchAsync";

const AuthRouter: Router = Router();
const userController = new UserController();

AuthRouter.post("/login", catchAsync(userController.login));
AuthRouter.post("/register", catchAsync(userController.register));

export default AuthRouter;
