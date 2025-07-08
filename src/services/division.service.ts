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

  createDivision: async (divisionData: { divisionName: string }) => {
    try {
      const response = await axiosInstance.post("/division", divisionData);
      return response.data;
    } catch (error) {
      console.error("Error creating division:", error);
      throw error;
    }
  },



  // Delete division
  deleteDivision: async (divisionId: number) => {
    try {
      await axiosInstance.delete(`/division/${divisionId}`);
    } catch (error) {
      console.error("Error deleting division:", error);
      throw error;
    }
  },
};
