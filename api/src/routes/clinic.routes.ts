import { Router } from "express";
import ClinicController from "../controllers/ClinicController";
import catchAsync from "../util/catchAsync"
import clinicSessionController from "../controllers/clinicSessionController";


const ClinicRouter:Router= Router();
const clinicController = new ClinicController();


// Route to ping the clinic service
// ClinicRouter.get("/ping", catchAsync(clinicController.ping)); 
ClinicRouter.post("/createClinic", catchAsync(clinicController.createClinic));

// // Get all clinics
ClinicRouter.get("/getAllClinics", catchAsync(clinicController.getAllClinics));

// // Get a clinic by ID
ClinicRouter.get("/:id", catchAsync(clinicController.getClinicById));

// session realeted routes
ClinicRouter.post("/:id/session", catchAsync(clinicSessionController.createSession));
ClinicRouter.get("/:id/GetSessionForClinic", catchAsync(clinicSessionController.getAllSessions));
ClinicRouter.get("/:id/session/:sid", catchAsync(clinicSessionController.getSessionById));
ClinicRouter.put("/:id/session/:sid", catchAsync(clinicSessionController.updateSession));
ClinicRouter.delete("/:id/session/:sid", catchAsync(clinicSessionController.deleteSession));



// // Update a clinic by ID
ClinicRouter.put("/:id", catchAsync(clinicController.updateClinic));

// // Delete a clinic by ID
ClinicRouter.delete("/:id", catchAsync(clinicController.deleteClinic));

export default ClinicRouter;