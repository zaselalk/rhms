import { Router } from "express";
import ResidentController from "../controllers/ResidentController";
import { protectRoute } from "../middleware/authjwt.middleware";
import catchAsync from "../util/catchAsync";

const ResidentRouter: Router = Router();
const residentController = new ResidentController();

ResidentRouter.get("/ping", protectRoute, catchAsync(residentController.ping));
export default ResidentRouter;
