import { Router } from "express";
import DisaseController from "../controllers/DisaseController";
import catchAsync from "../util/catchAsync";
import { protectRoute } from "../middleware/authjwt.middleware";

const DisaseRouter: Router = Router();
const disaseController = new DisaseController();

// DisaseRouter.get("/ping", protectRoute, catchAsync(disaseController.ping));

export default DisaseRouter;
