import { Request, Response, Router } from "express";
import passport from "../config/passport";
import User from "../models/user";
import UserController from "../controllers/UserController";
import catchAsync from "../util/catchAsync";

const AuthRouter: Router = Router();
const userController = new UserController();

AuthRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

AuthRouter.post(
  "/register",
  catchAsync(async (req: Request, res: Response) => {
    await userController.register(req, res);
  })
);

export default AuthRouter;
