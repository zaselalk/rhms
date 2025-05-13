import { Router } from "express";

import catchAsync from "../util/catchAsync";
import { DiseaseController } from "../controllers/DiseaseController";


const DiseaseRouter: Router = Router();
const diseaseController = new DiseaseController();

DiseaseRouter.post(
    "/create",
    // protectRoute,
    catchAsync(diseaseController.createDisease)
);

DiseaseRouter.get(
    "/all", 
    catchAsync(diseaseController.getAllDiseases)
);

export default DiseaseRouter;
