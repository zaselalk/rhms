import { NextFunction, Request, Response, Router } from "express";
import passport from "../config/passport";
import User from "../models/user";
import UserController from "../controllers/UserController";
import catchAsync from "../util/catchAsync";

const AuthRouter: Router = Router();
const userController = new UserController();

AuthRouter.post("/login", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    (
      err: Error | null,
      user: User | false,
      info: { message: string } | undefined
    ) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: info?.message || "Authentication failed",
        });
      }

      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }

        return res.status(200).json({
          success: true,
          user,
        });
      });
    }
  )(req, res, next);
});

AuthRouter.post(
  "/register",
  catchAsync(async (req: Request, res: Response) => {
    await userController.register(req, res);
  })
);

export default AuthRouter;
