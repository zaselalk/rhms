import axiosInstance from "./axios/axiosInstance";

class ResidentService {
  // Add Resident
  async addResident(newResidentData: any) {
    const response = await fetch(
      "http://localhost:3001/resident/createResident",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newResidentData),
      }
    );
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
      throw new Error(
        error.response?.data?.message || "Unable to fetch residents overview"
      );
    }
  }

  // Get Resident Count
  async getResidentCount() {
    try {
      const response = await axiosInstance.get("/resident/residentCount");
      return response.data.data.count;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch resident count"
      );
    }
  }
  // resident login
  async loginResidentByEmailandPassword(email: string, password: string) {
    try {
      const response = await axiosInstance.post("/resident/login", {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response?.data.error || "Unable to login resident");
    }
  }

  async getSingleResident(id: string) {
    try {
      const response = await axiosInstance.get(`/resident/id/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch resident details"
      );
    }
  }

  // Check if resident token is valid
  async checkResidentToken() {
    try {
      const token = localStorage.getItem("residentToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axiosInstance.get("/resident/verify-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to verify resident token"
      );
    }
  }

  // Get current resident profile
  async getCurrentResidentProfile() {
    try {
      const token = localStorage.getItem("residentToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axiosInstance.get("/resident/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch resident profile"
      );
    }
  }
}

export default new ResidentService();
