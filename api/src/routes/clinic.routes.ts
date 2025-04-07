import { Router } from "express";
import ClinicController from "../controllers/ClinicController";
import catchAsync from "../util/catchAsync";


const ClinicRouter:Router= Router();
const clinicController = new ClinicController();


// Route to ping the clinic service
// ClinicRouter.get("/ping", catchAsync(clinicController.ping)); 
ClinicRouter.post("/createClinic", catchAsync(clinicController.createClinic));

// // Get all clinics
ClinicRouter.get("/getAllClinics", catchAsync(clinicController.getAllClinics));

// // Get a clinic by ID
ClinicRouter.get("/:id", catchAsync(clinicController.getClinicById));

// // Update a clinic by ID
ClinicRouter.put("/:id", catchAsync(clinicController.updateClinic));

// // Delete a clinic by ID
ClinicRouter.delete("/:id", catchAsync(clinicController.deleteClinic));

export default ClinicRouter;