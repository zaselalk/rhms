import { ClinicSession } from "../pages/admin/ClinicDetailPage";
import axiosInstance from "./axios/axiosInstance";

// Define clinic API service functions
export const ClinicService = {
  // Fetch all clinics
  getAllClinics: async () => {
    try {
      const response = await axiosInstance.get("/clinic/getAllClinics");
      return response.data;
    } catch (error) {
      console.error("Error fetching clinics:", error);
      throw error;
    }
  },

  // Get clinic by ID
  getClinicById: async (clinicId: string) => {
    try {
      const response = await axiosInstance.get(`/clinic/${clinicId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching clinic by ID:", error);
      throw error;
    }
  },

  // Create a new clinic
  createClinic: async (clinicData: { name: string }) => {
    try {
      const response = await axiosInstance.post(
        "/clinic/createClinic",
        clinicData,
      );
      return response.data;
    } catch (error) {
      console.error("Error creating clinic:", error);
      throw error;
    }
  },

  // Delete a clinic
  deleteClinic: async (clinicId: string) => {
    try {
      await axiosInstance.delete(`/clinic/${clinicId}`);
    } catch (error) {
      console.error("Error deleting clinic:", error);
      throw error;
    }
  },

  // Update clinic name
  updateClinicName: async (clinicId: string, clinicData: { name: string }) => {
    try {
      const response = await axiosInstance.put(
        `/clinic/${clinicId}`,
        clinicData,
      );
      return response.data;
    } catch (error) {
      console.error("Error updating clinic:", error);
      throw error;
    }
  },

  // Create a new session for a clinic
  createClinicSession: async (
    clinicId: string,
    sessionData: { name: string; sessionDate: string },
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

// Get all sessions for a specific clinic
getClinicSessions: async (clinicId: string) => {
  const response = await axiosInstance.get(`/clinic/${clinicId}/GetSessionForClinic`);
  return response.data;
},

// Get a specific session by ID for a clinic
updateClinicSession: async (
  clinicId: string,
  sessionData: ClinicSession
) => {
  try {
    const { sessionId
, ...sessionBody } = sessionData; // exclude id
    const response = await axiosInstance.put(
      `/clinic/${clinicId}/session/${sessionId
}`,
      sessionBody
    );
    return response.data;
  } catch (error) {
    console.error("Error updating clinic session:", error);
    throw error;
  }
},


// Delete a session for a clinic
deleteClinicSession: async (clinicId: string, sessionId: string) => {
  try {
    await axiosInstance.delete(`/clinic/${clinicId}/session/${sessionId}`);
  } catch (error) {
    console.error("Error deleting clinic session:", error);
    throw error;
  }
},

  //  Get all resident clinics
  getAllResidentClinics: async () => {
    try {
      const response = await axiosInstance.get("/residentClinic/getAllResidentClinics");
      return response.data;
    } catch (error) {
      console.error("Error fetching resident clinics:", error);
      throw error;
    }
  },
  // Get clinic attendance for a specific session
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
        attendanceList
      );
      return response.data;
    } catch (error) {
      console.error("Error saving clinic attendance:", error);
      throw error;
    }
  },
};


