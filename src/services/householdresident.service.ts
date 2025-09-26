// src/services/HouseholdResidentService.ts
import axiosInstance from "./axios/axiosInstance";

class HouseholdResidentService {
  // Get all residents for a given household ID
  async getResidentsByHouseholdId(householdId: number | string) {
    try {
      const response = await axiosInstance.get(
        `/household-resident/${householdId}/residents`,
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Unable to fetch residents for household",
      );
    }
  }

  // Add a resident to a household
  async addResidentToHousehold(
    householdId: number | string,
    data: { residentId: number; relation: string },
  ) {
    try {
      const response = await axiosInstance.post(
        `/household-resident/${householdId}/add-resident`,
        data,
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to add resident to household",
      );
    }
  }

  // Remove a resident from the household by household-resident record ID
  async removeResidentFromHousehold(householdResidentId: number) {
    try {
      const response = await axiosInstance.delete(
        `/household-resident/${householdResidentId}`,
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Unable to remove resident from household",
      );
    }
  }

  // Update the owner (residentId) for a household
async updateOwnerResident(householdId: number | string, residentId: number) {
  console.log("Sending request to update owner relation");
  console.log("householdId:", householdId, "residentId:", residentId);
  try {
    const response = await axiosInstance.put(
      `/household-resident/${householdId}/update-owner`,
      { residentId }
    );
    console.log("Response from backend:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error updating owner relation in frontend:", error);
    throw new Error(
      error.response?.data?.message ||
        "Unable to update owner in household-resident"
    );
  }
}
}

export default new HouseholdResidentService();
