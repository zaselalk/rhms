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


export default residentClinicRouter;




