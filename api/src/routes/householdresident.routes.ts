import e, { Router } from "express";
import catchAsync from "../util/catchAsync";
import { protectRoute } from "../middleware/authjwt.middleware";
import { HouseholdResidentController } from "../controllers/HouseholdResidentController";

const HouseholdResidentRouter: Router = Router();
const householdResidentController = new HouseholdResidentController();

HouseholdResidentRouter.post(
  "/:id/add-resident",
  // protectRoute("householdresident:add"),
  catchAsync(householdResidentController.addResidentToHousehold),
);

HouseholdResidentRouter.get(
  "/:id/residents",
  // protectRoute("householdresident:view"),
  catchAsync(householdResidentController.getResidentsByHouseholdId),
);

HouseholdResidentRouter.delete(
  "/:id",
  // protectRoute("householdresident:delete"),
  catchAsync(householdResidentController.removeResident),
);

HouseholdResidentRouter.put(
  "/:householdId/update-owner",
  catchAsync(householdResidentController.updateOwnerResident),
);



export default HouseholdResidentRouter;
