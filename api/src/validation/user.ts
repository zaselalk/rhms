import { Request, RequestHandler, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const userRegisterValidation: RequestHandler[] = [
  body("email").isEmail().withMessage("Email is not valid"),
  body("password").notEmpty().withMessage("Password is required"),
  body("name").notEmpty().withMessage("First name is required"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export const userLoginValidation: RequestHandler[] = [
  body("email").isEmail().withMessage("Email is not valid"),
  body("password").notEmpty().withMessage("Password is required"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
