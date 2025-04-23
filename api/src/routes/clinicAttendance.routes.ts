// routes/clinicAttendanceRoutes.ts

import express from "express";
import * as clinicAttendanceController from "../controllers/ClinicAttendanceController";

const router = express.Router();

// POST: Mark or update attendance
router.post("/", clinicAttendanceController.markAttendance);

// GET: Fetch all attendance records
router.get("/", clinicAttendanceController.getAllAttendances);

// GET: Fetch a specific attendance record
//router.get("/:clinicId/:sessionId/:patientId", clinicAttendanceController.getAttendance);

// PUT: Update a specific attendance record
//router.put("/:clinicId/:sessionId/:patientId", clinicAttendanceController.updateAttendance);

// DELETE: Remove a specific attendance record
//router.delete("/:clinicId/:sessionId/:patientId", clinicAttendanceController.deleteAttendance);

export default router;
