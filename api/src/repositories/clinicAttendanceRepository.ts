// repositories/clinicAttendanceRepository.ts

import ClinicAttendance from "../models/clinicAttendnce"; 

export const upsertAttendance = async (data: {
  clinicId: number;
  sessionId: number;
  patientId: number;
  attendance: boolean;
}) => {
  return await ClinicAttendance.upsert(data);
};

export const findAllAttendances = async () => {
  return await ClinicAttendance.findAll({
    include: ["Clinic", "Session", "Resident"],
  });
};

export const findAttendance = async (
  clinicId: number,
  sessionId: number,
  patientId: number
) => {
  return await ClinicAttendance.findOne({
    where: { clinicId, sessionId, patientId },
    include: ["Clinic", "Session", "Resident"],
  });
};

export const updateAttendance = async (
  clinicId: number,
  sessionId: number,
  patientId: number,
  attendance: boolean
) => {
  const record = await ClinicAttendance.findOne({
    where: { clinicId, sessionId, patientId },
  });
  if (!record) return null;

  record.attendance = attendance;
  await record.save();
  return record;
};

export const deleteAttendance = async (
  clinicId: number,
  sessionId: number,
  patientId: number
) => {
  return await ClinicAttendance.destroy({
    where: { clinicId, sessionId, patientId },
  });
};
