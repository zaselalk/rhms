import { ClinicSession } from "../pages/admin/ClinicDetailPage";
import axiosInstance from "./axios/axiosInstance";

export const ClinicService = {
  // ------------------------------
  // 📍 Clinic CRUD
  // ------------------------------
  getAllClinics: async () => {
    try {
      const response = await axiosInstance.get("/clinic/getAllClinics");
      return response.data;
    } catch (error) {
      console.error("Error fetching clinics:", error);
      throw error;
    }
  },

  getClinicById: async (clinicId: string) => {
    try {
      const response = await axiosInstance.get(`/clinic/${clinicId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching clinic by ID:", error);
      throw error;
    }
  },

  createClinic: async (clinicData: { name: string }) => {
    try {
      const response = await axiosInstance.post("/clinic/createClinic", clinicData);
      return response.data;
    } catch (error) {
      console.error("Error creating clinic:", error);
      throw error;
    }
  },

  updateClinicName: async (clinicId: string, clinicData: { name: string }) => {
    try {
      const response = await axiosInstance.put(`/clinic/${clinicId}`, clinicData);
      return response.data;
    } catch (error) {
      console.error("Error updating clinic:", error);
      throw error;
    }
  },

  deleteClinic: async (clinicId: string) => {
    try {
      await axiosInstance.delete(`/clinic/${clinicId}`);
    } catch (error) {
      console.error("Error deleting clinic:", error);
      throw error;
    }
  },

  // ------------------------------
  // 📍 Clinic Session Management
  // ------------------------------
  createClinicSession: async (
    clinicId: string,
    sessionData: { name: string; sessionDate: string }
  ) => {
    try {
      const response = await axiosInstance.post(`/clinic/${clinicId}/session`, {
        clinicId,
        ...sessionData,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating clinic session:", error);
      throw error;
    }
  },

  getClinicSessions: async (clinicId: string) => {
    try {
      const response = await axiosInstance.get(`/clinic/${clinicId}/GetSessionForClinic`);
      return response.data;
    } catch (error) {
      console.error("Error fetching sessions:", error);
      throw error;
    }
  },

  updateClinicSession: async (
    clinicId: string,
    sessionData: ClinicSession
  ) => {
    try {
      const { sessionId, ...sessionBody } = sessionData;
      const response = await axiosInstance.put(
        `/clinic/${clinicId}/session/${sessionId}`,
        sessionBody
      );
      return response.data;
    } catch (error) {
      console.error("Error updating clinic session:", error);
      throw error;
    }
  },

  deleteClinicSession: async (clinicId: string, sessionId: string) => {
    try {
      await axiosInstance.delete(`/clinic/${clinicId}/session/${sessionId}`);
    } catch (error) {
      console.error("Error deleting clinic session:", error);
      throw error;
    }
  },

  // ------------------------------
  // 📍 Clinic Attendance
  // ------------------------------
  saveClinicAttendance: async (
    clinicId: string,
    sessionId: string,
    attendanceList: {
      patientId: string;
      attendance: boolean;
    }[]
  ) => {
    try {
      const response = await axiosInstance.post(
        `/clinic/${clinicId}/session/${sessionId}/attendance`,
        {
          clinicId,
          attendances: attendanceList, //expected body shape
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error saving clinic attendance:", error);
      throw error;
    }
  },

  // ------------------------------
  // 📍 (Optional) Resident Clinics
  // ------------------------------
  getAllResidentClinics: async () => {
    try {
      const response = await axiosInstance.get("/residentClinic/getAllResidentClinics");
      return response.data;
    } catch (error) {
      console.error("Error fetching resident clinics:", error);
      throw error;
    }
  },
};
