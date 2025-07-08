import { Router } from "express";

import catchAsync from "../util/catchAsync";
import { protectRoute } from "../middleware/authjwt.middleware";
import { HouseholdController } from "../controllers/HoseholdController";

const HouseholdRouter: Router = Router();
const householdController = new HouseholdController();

// HouseholdRouter.get("/ping", protectRoute, catchAsync(householdController.ping));
HouseholdRouter.post(
  "/create",
  // protectRoute,
  catchAsync(householdController.createHousehold),
);

HouseholdRouter.get("/read", catchAsync(householdController.getAllHouseholds));

HouseholdRouter.put(
  "/update/:house_no",
  catchAsync(householdController.updateHouseholdOwner),
);

HouseholdRouter.delete(
  "/delete/:house_no",
  catchAsync(householdController.deleteHousehold),
);

export default HouseholdRouter;
