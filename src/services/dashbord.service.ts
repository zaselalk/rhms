import axiosInstance from "./axios/axiosInstance";  

export const DashboardService = {
  // Fetch the count of residents from the server
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