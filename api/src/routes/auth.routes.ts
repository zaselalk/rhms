import { Request, Response, Router } from "express";
import passport from "../config/passport";
import User from "../models/user";

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

  if (!name || !email || !password) {
    res.status(400).send("Name, email, and password are required.");
  }

  try {
    const user = await User.create({ name, email, password });
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send("Error registering new user.");
  }
});

export default AuthRouter;
