import { Router } from "express";
import { RoleController } from "../controllers/RoleController";
import catchAsync from "../util/catchAsync";

const RoleRouter: Router = Router();
const roleController: RoleController = new RoleController();

RoleRouter.post("/", catchAsync(roleController.createRole));
RoleRouter.get("/", catchAsync(roleController.getAllRoles));
RoleRouter.get("/:id", catchAsync(roleController.getRoleById));
RoleRouter.patch("/:id", catchAsync(roleController.updateRole));

export default RoleRouter;
