import axiosInstance from "./axios/axiosInstance";

class ResidentClinicService {
  // Register a resident to a clinic
  async registerResidentToClinic(data: {
    residentId: number;
    clinicId: number;
  }) {
    try {
      const response = await axiosInstance.post(
        "/residentClinic/registerClinic",
        data
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to register resident to clinic"
      );
    }
  }

  // Get all residentClinic associations
  async getAllResidentClinics() {
    try {
      const response = await axiosInstance.get(
        "/residentClinic/getAllResidentClinics"
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Unable to fetch resident-clinic records"
      );
    }
  }

  // Get all clinics registered by a specific resident
  async getClinicsByResidentId(residentId: number | string) {
    try {
      const response = await axiosInstance.get(
        `/residentClinic/getResident/${residentId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch clinics for resident"
      );
    }
  }

  // Get all residents registered under a specific clinic
  async getResidentsByClinicId(clinicId: number | string) {
    try {
      const response = await axiosInstance.get(
        `/residentClinic/getResidentsByClinic/${clinicId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch residents for clinic"
      );
    }
  }

  // Get division-wise patient count for a specific clinic
  async getDivisionWiseResidentCountsForClinic(clinicId: number | string) {
    try {
      const response = await axiosInstance.get(
        `/residentClinic/patientCountAcrossDivisions/${clinicId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch division-wise counts"
      );
    }
  }

  // Delete a resident-clinic relationship by ID
  async deleteResidentClinicRecord(residentClinicId: number) {
    try {
      const response = await axiosInstance.delete(
        `/residentClinic/${residentClinicId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Unable to delete resident-clinic record"
      );
    }
  }
}

export default new ResidentClinicService();
