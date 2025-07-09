import { Router } from "express";
import catchAsync from "../util/catchAsync";
import { ResidentDiseaseController } from "../controllers/ResidentDiseaseController";
import ResidentDisease from "../models/residentdisease";


const ResidentDiseaseRouter: Router = Router();
const residentDiseaseController = new ResidentDiseaseController();

// ResidentDiseaseRouter.get(
//     "/ping",
//     catchAsync(residentDiseaseController.residentDiseasePing)
// );

ResidentDiseaseRouter.post(
    "/createResidentDisease",
    catchAsync(residentDiseaseController.createResidentDisease)
);

ResidentDiseaseRouter.get(
    "/getAllResidentDiseases",
    catchAsync(residentDiseaseController.getAllResidentDiseases)
);

ResidentDiseaseRouter.get(
    "/getDiseasesByResidentId",
    catchAsync(residentDiseaseController.getDiseasesByResidentId)
)

ResidentDiseaseRouter.get(
    "/getResidentsByDiseaseId",
    catchAsync(residentDiseaseController.getResidentsByDiseaseId)
)

ResidentDiseaseRouter.put(
    "/updateByResidentId",
    catchAsync(residentDiseaseController.updateResidentDiseaseByResidentId)
);

ResidentDiseaseRouter.put(
    "/updateByDiseaseId",
    catchAsync(residentDiseaseController.updateResidentDiseaseByDiseaseId)
);

ResidentDiseaseRouter.delete(
    "/deleteByResidentId",
    catchAsync(residentDiseaseController.deleteResidentDiseaseByResidentId)
);

ResidentDiseaseRouter.delete(
    "/deleteByDiseaseId",
    catchAsync(residentDiseaseController.deleteResidentDiseaseByDiseaseId)
);

export default ResidentDiseaseRouter;