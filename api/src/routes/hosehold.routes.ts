import { Router } from "express";
import HouseholdController from "../controllers/HoseholdController";
import catchAsync from "../util/catchAsync";
import { protectRoute } from "../middleware/authjwt.middleware";

const HouseholdRouter: Router = Router();
const householdController = new HouseholdController();

HouseholdRouter.get("/ping", protectRoute, catchAsync(householdController.ping));
HouseholdRouter.post(
    "/create",
    protectRoute,
    catchAsync(householdController.create)
  );

export default HouseholdRouter;
