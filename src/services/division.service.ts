// src/services/DivisionService.ts
import axiosInstance from "./axios/axiosInstance";

export const DivisionService = {
  // Fetch all divisions
  getAllDivisions: async () => {
    try {
      const response = await axiosInstance.get("/division");
      return response.data;
    } catch (error) {
      console.error("Error fetching divisions:", error);
      throw error;
    }
  },

  // Fetch single division by ID
  getDivisionById: async (divisionId: string | number) => {
    try {
      const response = await axiosInstance.get(`/division/${divisionId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching division ${divisionId}:`, error);
      throw error;
    }
  },

  // Create a new division
  createDivision: async (divisionData: { divisionName: string }) => {
    try {
      const response = await axiosInstance.post("/division", divisionData);
      return response.data;
    } catch (error) {
      console.error("Error creating division:", error);
      throw error;
    }
  },

  // Delete a division
  deleteDivision: async (divisionId: number) => {
    try {
      await axiosInstance.delete(`/division/${divisionId}`);
    } catch (error) {
      console.error("Error deleting division:", error);
      throw error;
    }
  },
  // Fetch resident count by division ID
  getResidentCountByDivision: async (divisionId: string | number) => {
    const res = await axiosInstance.get(`/resident/division/${divisionId}/count`);
    return res.data; // Expected to return { divisionId, residentCount }
  },
};
