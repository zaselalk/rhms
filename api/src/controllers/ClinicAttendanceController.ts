import { Request, Response } from "express";
import * as attendanceService from "../services/clinicAttendanceService";

// Save or update multiple attendance records for a session
export const saveBulkAttendances = async (req: Request, res: Response) => {
  const sessionId = parseInt(req.params.sessionId);
  const clinicId = parseInt(req.body.clinicId);
  const attendances = req.body.attendances; // [{ patientId, attendance }]

  try {
    for (const record of attendances) {
      await attendanceService.markAttendance(
        clinicId,
        sessionId,
        record.patientId,
        record.attendance
      );
    }
    return res.status(200).json({ message: "Attendances saved successfully." });
  } catch (error) {
    console.error("Error saving attendances:", error);
    return res.status(500).json({ error: "Failed to save attendances." });
  }
};

// Get all attendance records
export const getAllAttendances = async (req: Request, res: Response) => {
  try {
    const clinicId = parseInt(req.params.clinicId);
    const sessionId = parseInt(req.params.sessionId);
    const data = await attendanceService.getAllAttendances(clinicId, sessionId);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching all attendances:", error);
    return res.status(500).json({ error: "Failed to fetch attendances." });
  }
};

// Get attendance for a specific patient
export const getAttendance = async (req: Request, res: Response) => {
  const clinicId = parseInt(req.params.clinicId);
  const sessionId = parseInt(req.params.sessionId);
  const patientId = parseInt(req.params.patientId);

  try {
    const record = await attendanceService.getAttendance(
      clinicId,
      sessionId,
      patientId
    );
    if (!record)
      return res.status(404).json({ message: "Attendance not found." });
    return res.status(200).json(record);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return res.status(500).json({ error: "Failed to fetch attendance." });
  }
};

// Update a single attendance record
export const updateAttendance = async (req: Request, res: Response) => {
  const clinicId = parseInt(req.params.clinicId);
  const sessionId = parseInt(req.params.sessionId);
  const patientId = parseInt(req.params.patientId);
  const { attendance } = req.body;

  try {
    const updated = await attendanceService.modifyAttendance(
      clinicId,
      sessionId,
      patientId,
      attendance
    );
    if (!updated)
      return res.status(404).json({ message: "Attendance not found." });
    return res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating attendance:", error);
    return res.status(500).json({ error: "Failed to update attendance." });
  }
};

// Delete a specific attendance record
export const deleteAttendance = async (req: Request, res: Response) => {
  const clinicId = parseInt(req.params.clinicId);
  const sessionId = parseInt(req.params.sessionId);
  const patientId = parseInt(req.params.patientId);

  try {
    await attendanceService.removeAttendance(clinicId, sessionId, patientId);
    return res
      .status(200)
      .json({ message: "Attendance deleted successfully." });
  } catch (error) {
    console.error("Error deleting attendance:", error);
    return res.status(500).json({ error: "Failed to delete attendance." });
  }
};
