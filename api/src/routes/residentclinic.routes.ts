import { Router } from "express";
import ResidentController from "../controllers/ResidentController";
import ResidentClinic from "../models/residentClinic";
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
    catchAsync(residentClinicController.getResidentByClinicId)
);


export default residentClinicRouter;




