import axiosInstance from "./axios/axiosInstance";  

export const DashboardService = {
  // Fetch all clinics
    getresidentCount: async () => {
        try {
        const response = await axiosInstance.get("/resident/residentCount");
        return response.data.data;
        } catch (error) {
        console.error("Error fetching clinics:", error);
        throw error;
        }
    },


    
};