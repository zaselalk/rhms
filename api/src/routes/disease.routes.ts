import { Router } from "express";
import catchAsync from "../util/catchAsync";
import { DiseaseController } from "../controllers/DiseaseController";
import { protectRoute } from "../middleware/authjwt.middleware";

const DiseaseRouter: Router = Router();
const diseaseController = new DiseaseController();

DiseaseRouter.post(
  "/create",
  protectRoute("disease:create"),
  catchAsync(diseaseController.createDisease)
);

DiseaseRouter.get(
  "/all",
  protectRoute("disease:view"),
  catchAsync(diseaseController.getAllDiseases)
);

DiseaseRouter.delete(
  "/delete/:diseaseName",
  protectRoute("disease:delete"),
  catchAsync(diseaseController.deleteDisease)
);

DiseaseRouter.get(
  "/count",
  protectRoute("disease:create"),
  catchAsync(diseaseController.countDisease)
);

export default DiseaseRouter;
