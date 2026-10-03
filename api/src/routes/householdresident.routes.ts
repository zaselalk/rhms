import { Router } from "express";
import catchAsync from "../util/catchAsync";
import { protectRoute } from "../middleware/authjwt.middleware";
import { HouseholdResidentController } from "../controllers/HouseholdResidentController";

const HouseholdResidentRouter: Router = Router();
const householdResidentController = new HouseholdResidentController();

HouseholdResidentRouter.post(
  "/:id/add-resident",
  protectRoute("household:create"),
  catchAsync(householdResidentController.addResidentToHousehold)
);

HouseholdResidentRouter.get(
  "/:id/residents",
  protectRoute("household:view"),
  catchAsync(householdResidentController.getResidentsByHouseholdId)
);

HouseholdResidentRouter.get(
  "/family/:residentId",
  protectRoute("household:view"),
  catchAsync(householdResidentController.getFamilyMembersByResidentId)
);

HouseholdResidentRouter.delete(
  "/:id",
  protectRoute("household:delete"),
  catchAsync(householdResidentController.removeResident)
);

HouseholdResidentRouter.put(
  "/:householdId/update-owner",
  protectRoute("household:edit"),
  catchAsync(householdResidentController.updateOwnerResident)
);

export default HouseholdResidentRouter;
