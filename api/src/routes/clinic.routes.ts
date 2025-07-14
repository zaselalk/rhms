import { Router } from "express";
import ClinicController from "../controllers/ClinicController";
import clinicSessionController from "../controllers/clinicSessionController";
import * as clinicAttendanceController from "../controllers/ClinicAttendanceController";
import catchAsync from "../util/catchAsync";

const ClinicRouter: Router = Router();
const clinicController = new ClinicController();

// Clinic CRUD
ClinicRouter.post("/createClinic", catchAsync(clinicController.createClinic));
ClinicRouter.get("/getAllClinics", catchAsync(clinicController.getAllClinics));
ClinicRouter.get("/:id", catchAsync(clinicController.getClinicById));
ClinicRouter.put("/:id", catchAsync(clinicController.updateClinic));
ClinicRouter.delete("/:id", catchAsync(clinicController.deleteClinic));

// Clinic Session Routes
ClinicRouter.post("/:id/session", catchAsync(clinicSessionController.createSession));
ClinicRouter.get("/:id/GetSessionForClinic", catchAsync(clinicSessionController.getAllSessions));
ClinicRouter.get("/:id/session/:sid", catchAsync(clinicSessionController.getSessionById));
ClinicRouter.put("/:id/session/:sid", catchAsync(clinicSessionController.updateSession));
ClinicRouter.delete("/:id/session/:sid", catchAsync(clinicSessionController.deleteSession));

// Attendance Route for Session
ClinicRouter.post(
  "/:clinicId/session/:sessionId/attendance",
  catchAsync(clinicAttendanceController.markAttendance)
);

ClinicRouter.get(
  "/:clinicId/session/:sessionId/attendance/:patientId",
  catchAsync(clinicAttendanceController.getAttendance)
);

ClinicRouter.put(
  "/:clinicId/session/:sessionId/attendance/:patientId",
  catchAsync(clinicAttendanceController.updateAttendance)
);

ClinicRouter.delete(
  "/:clinicId/session/:sessionId/attendance/:patientId",
  catchAsync(clinicAttendanceController.deleteAttendance)
);

// Optional: Get all attendances (for admin view)
ClinicRouter.get(
  "/attendances",
  catchAsync(clinicAttendanceController.getAllAttendances)
);

export default ClinicRouter;
