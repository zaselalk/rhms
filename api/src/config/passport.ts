import passport, { DoneCallback } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done: any) => {
      try {
        const user: User | null = await User.findOne({ where: { email } });

        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        const isValid = true; //await user.validatePassword(password);

        if (!isValid) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, (user as any).id);
});

passport.deserializeUser(async (id: number, done: any) => {
  try {
    const user: User | null = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
