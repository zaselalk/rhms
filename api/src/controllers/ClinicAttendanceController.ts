// controllers/clinicAttendanceController.ts

import { Request, Response } from "express";
import { ClinicAttendance } from "../models/clinicAttendnce"; 
import Clinic from "../models/clinic";
import Session from "../models/clinicSession";
import Resident from "../models/resident";

// Create or mark attendance
export const markAttendance = async (req: Request, res: Response) => {
  try {
    const { clinicId, sessionId, patientId, attendance } = req.body;

    const record = await ClinicAttendance.upsert({
      clinicId,
      sessionId,
      patientId,
      attendance,
    });

    res.status(200).json({ message: "Attendance marked successfully", record });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark attendance", details: error });
  }
};

// Get all attendance records
export const getAllAttendances = async (_req: Request, res: Response) => {
  try {
    const records = await ClinicAttendance.findAll({
      include: [Clinic, Session, Resident],
    });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attendance records" });
  }
};

// Get a specific attendance record
export const getAttendance = async (req: Request, res: Response) => {
  const { clinicId, sessionId, patientId } = req.params;

  try {
    const record = await ClinicAttendance.findOne({
      where: { clinicId, sessionId, patientId },
      include: [Clinic, Session, Resident],
    });

    if (!record) {
      return res.status(404).json({ error: "Attendance record not found" });
    }

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attendance record" });
  }
};

// Update attendance
export const updateAttendance = async (req: Request, res: Response) => {
  const { clinicId, sessionId, patientId } = req.params;
  const { attendance } = req.body;

  try {
    const record = await ClinicAttendance.findOne({
      where: { clinicId, sessionId, patientId },
    });

    if (!record) {
      return res.status(404).json({ error: "Attendance record not found" });
    }

    record.attendance = attendance;
    await record.save();

    res.status(200).json({ message: "Attendance updated", record });
  } catch (error) {
    res.status(500).json({ error: "Failed to update attendance" });
  }
};

// Delete attendance
export const deleteAttendance = async (req: Request, res: Response) => {
  const { clinicId, sessionId, patientId } = req.params;

  try {
    const result = await ClinicAttendance.destroy({
      where: { clinicId, sessionId, patientId },
    });

    if (!result) {
      return res.status(404).json({ error: "Attendance record not found" });
    }

    res.status(200).json({ message: "Attendance deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete attendance" });
  }
};
