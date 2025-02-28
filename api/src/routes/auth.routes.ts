import { Request, Response, Router } from "express";
import passport from "../config/passport";
import { User } from "../models/user";

const AuthRouter: Router = Router();

AuthRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

AuthRouter.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Error registering new user.");
  }
});

export default AuthRouter;
