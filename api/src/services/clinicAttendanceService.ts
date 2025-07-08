// services/clinicAttendanceService.ts

import * as repo from "../repositories/clinicAttendanceRepository";

export const markAttendance = async (
  clinicId: number,
  sessionId: number,
  patientId: number,
  attendance: boolean,
) => {
  return await repo.upsertAttendance({
    clinicId,
    sessionId,
    patientId,
    attendance,
  });
};

export const getAllAttendances = async () => {
  return await repo.findAllAttendances();
};

export const getAttendance = async (
  clinicId: number,
  sessionId: number,
  patientId: number,
) => {
  return await repo.findAttendance(clinicId, sessionId, patientId);
};

export const modifyAttendance = async (
  clinicId: number,
  sessionId: number,
  patientId: number,
  attendance: boolean,
) => {
  return await repo.updateAttendance(
    clinicId,
    sessionId,
    patientId,
    attendance,
  );
};

export const removeAttendance = async (
  clinicId: number,
  sessionId: number,
  patientId: number,
) => {
  return await repo.deleteAttendance(clinicId, sessionId, patientId);
};
