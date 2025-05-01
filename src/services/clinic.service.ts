// services/axios/clinic.servic

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

  // Create a new clinic
  createClinic: async (clinicData: { name: string }) => {
    try {
      const response = await axiosInstance.post("/clinic/createClinic", clinicData);
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
        const response = await axiosInstance.put(`/clinic/${clinicId}`, clinicData);
      return response.data;
    } catch (error) {
      console.error("Error updating clinic:", error);
      throw error;
    }
  },
};
