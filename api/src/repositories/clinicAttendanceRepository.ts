import ClinicAttendance from "../models/clinicAttendnce"; 
import Clinic from "../models/clinic";
import Session from "../models/clinicSession";
import Resident from "../models/resident";

// Upsert attendance (create or update)
export const upsertAttendance = async (data: {
  clinicId: number;
  sessionId: number;
  patientId: number;
  attendance: boolean;
}) => {
  return await ClinicAttendance.upsert(data);
};

// Find all attendances (with joins)
export const findAllAttendances = async () => {
  return await ClinicAttendance.findAll({
    include: [Clinic, Session, Resident],
  });
};

// Find one specific attendance record
export const findAttendance = async (
  clinicId: number,
  sessionId: number,
  patientId: number
) => {
  return await ClinicAttendance.findOne({
    where: { clinicId, sessionId, patientId },
    include: [Clinic, Session, Resident],
  });
};

// Update attendance status
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

// Delete attendance record
export const deleteAttendance = async (
  clinicId: number,
  sessionId: number,
  patientId: number
) => {
  return await ClinicAttendance.destroy({
    where: { clinicId, sessionId, patientId },
  });
};
