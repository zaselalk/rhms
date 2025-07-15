import { Router } from "express";
import ClinicController from "../controllers/ClinicController";
import clinicSessionController from "../controllers/clinicSessionController";
import * as clinicAttendanceController from "../controllers/ClinicAttendanceController";
import catchAsync from "../util/catchAsync";
import { protectRoute } from "../middleware/authjwt.middleware";

const ClinicRouter: Router = Router();
const clinicController = new ClinicController();

// ----------------------
// 📍 Clinic CRUD Routes
// ----------------------
ClinicRouter.post(
  "/createClinic",
  protectRoute("clinic:create"),
  catchAsync(clinicController.createClinic)
);
ClinicRouter.get(
  "/getAllClinics",
  protectRoute("clinic:view"),
  catchAsync(clinicController.getAllClinics)
);
ClinicRouter.get(
  "/:id",
  protectRoute("clinic:view"),
  catchAsync(clinicController.getClinicById)
);
ClinicRouter.put(
  "/:id",
  protectRoute("clinic:edit"),
  catchAsync(clinicController.updateClinic)
);
ClinicRouter.delete(
  "/:id",
  protectRoute("clinic:delete"),
  catchAsync(clinicController.deleteClinic)
);

// ----------------------
// 📍 Clinic Session Routes
// ----------------------
ClinicRouter.post(
  "/:id/session",
  protectRoute("clinic:edit"),
  catchAsync(clinicSessionController.createSession)
);
ClinicRouter.get(
  "/:id/GetSessionForClinic",
  protectRoute("clinic:edit"),
  catchAsync(clinicSessionController.getAllSessions)
);
ClinicRouter.get(
  "/:id/session/:sid",
  protectRoute("clinic:edit"),
  catchAsync(clinicSessionController.getSessionById)
);
ClinicRouter.put(
  "/:id/session/:sid",
  protectRoute("clinic:edit"),
  catchAsync(clinicSessionController.updateSession)
);
ClinicRouter.delete(
  "/:id/session/:sid",
  protectRoute("clinic:edit"),
  catchAsync(clinicSessionController.deleteSession)
);

// ----------------------
// 📍 Clinic Attendance Routes
// ----------------------

// ✅ Bulk save (create/update) attendances
ClinicRouter.post(
  "/:clinicId/session/:sessionId/attendance",
  protectRoute("clinic:edit"),
  catchAsync(clinicAttendanceController.saveBulkAttendances) //
);

// ✅ Get specific patient’s attendance
ClinicRouter.get(
  "/:clinicId/session/:sessionId/attendance/:patientId",
  protectRoute("clinic:edit"),
  catchAsync(clinicAttendanceController.getAttendance)
);

// ✅ Update a specific attendance
ClinicRouter.put(
  "/:clinicId/session/:sessionId/attendance/:patientId",
  protectRoute("clinic:edit"),
  catchAsync(clinicAttendanceController.updateAttendance)
);

// ✅ Delete a specific attendance
ClinicRouter.delete(
  "/:clinicId/session/:sessionId/attendance/:patientId",
  protectRoute("clinic:edit"),
  catchAsync(clinicAttendanceController.deleteAttendance)
);

// ✅ Optional: Admin route to get all attendance records
ClinicRouter.get(
  "/:clinicId/session/:sessionId/attendance",
  protectRoute("clinic:edit"),
  catchAsync(clinicAttendanceController.getAllAttendances)
);

export default ClinicRouter;
