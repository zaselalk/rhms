import { Router } from "express";

import catchAsync from "../util/catchAsync";
import { protectRoute } from "../middleware/authjwt.middleware";
import { HouseholdController } from "../controllers/HoseholdController";

const HouseholdRouter: Router = Router();
const householdController = new HouseholdController();

// HouseholdRouter.get("/ping", protectRoute, catchAsync(householdController.ping));
HouseholdRouter.post(
  "/create",
  protectRoute("household:create"),
  catchAsync(householdController.createHousehold),
);

HouseholdRouter.get(
  "/read",
  protectRoute("household:view"),
  catchAsync(householdController.getAllHouseholds),
);

HouseholdRouter.put(
  "/update/:house_no",
  protectRoute("household:update"),
  catchAsync(householdController.updateHouseholdOwner),
);

HouseholdRouter.delete(
  "/delete/:house_no",
  protectRoute("household:delete"),
  catchAsync(householdController.deleteHousehold),
);

HouseholdRouter.get(
  "/count",
  catchAsync(householdController.gethouseholdCount),
);

export default HouseholdRouter;
