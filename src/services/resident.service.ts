import axiosInstance from "./axios/axiosInstance";

class ResidentService {
    // Add Resident
    async addResident(newResidentData: any) {
        const response = await fetch("http://localhost:3001/resident/createResident", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newResidentData),

        });
        console.log("newResidentData", newResidentData);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error adding resident:", errorData);
            throw new Error(errorData.message || "Unable to add resident");
        }

        const data = await response.json();

        // Check if the response contains a success message    
        return data;
    }

    //resident Overview
    async getResidentOverview() {
        try {
            const response = await axiosInstance.get("/resident/residentOverview");
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Unable to fetch residents overview");
        }
    }

    // Get Resident Count
    async getResidentCount() {
        try {
            const response = await axiosInstance.get("/resident/residentCount");
            return response.data.data.count;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Unable to fetch resident count");
        }
    }





}


export default new ResidentService();