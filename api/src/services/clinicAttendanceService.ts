import * as repo from "../repositories/ClinicAttendanceRepository";

// Mark (create or update) a patient's attendance
export const markAttendance = async (
  clinicId: number,
  sessionId: number,
  patientId: number,
  attendance: boolean
) => {
  return await repo.upsertAttendance({ clinicId, sessionId, patientId, attendance });
};

// Get all attendance records
export const getAllAttendances = async () => {
  return await repo.findAllAttendances();
};

// Get attendance for a specific patient in a session
export const getAttendance = async (
  clinicId: number,
  sessionId: number,
  patientId: number
) => {
  return await repo.findAttendance(clinicId, sessionId, patientId);
};

// Modify an existing attendance record
export const modifyAttendance = async (
  clinicId: number,
  sessionId: number,
  patientId: number,
  attendance: boolean
) => {
  return await repo.updateAttendance(clinicId, sessionId, patientId, attendance);
};

// Delete a specific attendance record
export const removeAttendance = async (
  clinicId: number,
  sessionId: number,
  patientId: number
) => {
  return await repo.deleteAttendance(clinicId, sessionId, patientId);
};
