import { Router } from "express";

import catchAsync from "../util/catchAsync";
import { protectRoute } from "../middleware/authjwt.middleware";
import { DiseaseController } from "../controllers/DiseaseController";


const DiseaseRouter: Router = Router();
const diseaseController = new DiseaseController();

DiseaseRouter.post(
    "/create",
    // protectRoute,
    catchAsync(diseaseController.createDisease)
);

export default DiseaseRouter;
