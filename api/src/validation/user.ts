import { Request, RequestHandler, Response, NextFunction } from "express";
import { body, validationResult, param } from "express-validator";

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

export const userFullNameUpdateValidation: RequestHandler[] = [
  body("full_name").notEmpty().withMessage("Full name is required"),
  param("id").isNumeric().withMessage("User ID must be a number"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export const userRoleUpdateValidation: RequestHandler[] = [
  body("role_id").isNumeric().withMessage("Role ID must be a number"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export const userPasswordUpdateValidation: RequestHandler[] = [
  body("password").notEmpty().withMessage("Password is required"),
  body("new_password").notEmpty().withMessage("New password is required"),
  // .isLength({ min: 6 })
  // .withMessage("New password must be at least 6 characters long"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export const userDeleteValidation: RequestHandler[] = [
  param("id").isNumeric().withMessage("User ID must be a number"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
