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
ResidentDiseaseRouter.delete(
    "/deleteByResidentId",
    catchAsync(residentDiseaseController.deleteResidentDiseaseByResidentId)
);

ResidentDiseaseRouter.delete(
    "/deleteByDiseaseId",
    catchAsync(residentDiseaseController.deleteResidentDiseaseByDiseaseId)
);

ResidentDiseaseRouter.get(
    "/divisionCountsByDisease/:diseaseName",
    catchAsync(residentDiseaseController.getDiseaseCountsByDivision)
);
ResidentDiseaseRouter.get(
  "/disease-patient-counts/:divisionId",
  catchAsync(residentDiseaseController.getDiseaseCountsByDivision)
);

export default ResidentDiseaseRouter;