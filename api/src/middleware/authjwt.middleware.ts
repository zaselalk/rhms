import { Request, Response, NextFunction } from "express";
export const protectRoute =
  (permissions: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    // check if user is logged in
    if (!req.user || !req.user) {
      next({
        status: 401,
        message: "Unauthorized",
      });
      return;
    }

    let user = req.user;

    if (user.role) {
      // pharse the role string
      user.role.permission = JSON.parse(user.role.permission);

      // check if user has permission to access the route
      if (!user.role.permission.includes(permissions)) {
        next({
          status: 403,
          message: "Forbidden",
        });

        return;
      }
    }

    next();
  };
