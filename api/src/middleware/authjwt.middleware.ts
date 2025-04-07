import { Request, Response, NextFunction } from "express";
import passport from "passport";
export const protectRoute =
  (permissions: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
      if (err || !user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userPermissions = JSON.parse(user.role.permission);

      if (!userPermissions.includes(permissions)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
