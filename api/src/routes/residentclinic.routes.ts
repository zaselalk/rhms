import { Router } from "express";
import ResidentClinicController from "../controllers/ResidentClinicController";
import catchAsync from "../util/catchAsync";

const residentClinicRouter = Router();
const residentClinicController = new ResidentClinicController();

residentClinicRouter.post(
    "/registerClinic",
    catchAsync(residentClinicController.registerClinic)
);

residentClinicRouter.get(
    "/getAllResidentClinics",
    catchAsync(residentClinicController.getAllResidentClinics)
);

residentClinicRouter.get(
    "/getResident/:residentId",
    catchAsync(residentClinicController.getClinicsByResidentId)
);

residentClinicRouter.get(
  "/getResidentsByClinic/:clinicId",
  catchAsync(residentClinicController.getResidentsByClinicId)
);

residentClinicRouter.get(
  "/division-count/:clinicId",
  catchAsync(residentClinicController.getDivisionPatientCountByClinic)
);




export default residentClinicRouter;




