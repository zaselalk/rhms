import { Router } from "express";
import catchAsync from "../util/catchAsync";
import { DiseaseController } from "../controllers/DiseaseController";
import { protectRoute } from "../middleware/authjwt.middleware";

const DiseaseRouter: Router = Router();
const diseaseController = new DiseaseController();

DiseaseRouter.post(
  "/create",
  // protectRoute("disease:create"),
  catchAsync(diseaseController.createDisease)
);

DiseaseRouter.get(
  "/all",
  // protectRoute("disease:create"),
  catchAsync(diseaseController.getAllDiseases)
);

DiseaseRouter.delete(
  "/delete/:diseaseName",
  // protectRoute("disease:create"),
  catchAsync(diseaseController.deleteDisease)
);

export default DiseaseRouter;
