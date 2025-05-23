// src/services/DiseaseService.ts
import axiosInstance from './axios/axiosInstance';

class DiseaseService {
    // Create a new disease
    async createDisease(newDiseaseData: { diseaseName: string }) {
        try {
            const response = await axiosInstance.post('/disease/create', newDiseaseData);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Unable to create disease');
        }
    }

    // Get all diseases
    async getAllDiseases() {
        try {
            const response = await axiosInstance.get('/disease/all');
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Unable to fetch diseases');
        }
    }

    // Delete a disease by name or id (you can change path param as needed)
    async deleteDisease(diseaseName: string) {
        try {
            const response = await axiosInstance.delete(`/disease/delete/${diseaseName}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Unable to delete disease');
        }
    }


     // Get patient counts for each disease
    async getDiseasePatientCounts() {
    try {
      const response = await axiosInstance.get('/resident/disease-patient-counts');
      return response.data; // Expected to return array: [{ name: string, patients: number }]
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Unable to fetch disease patient counts');
    }
  }

    // Get patient counts for a specific disease by division
    async getDiseaseCountsByDivision(diseaseName: string) {
        try {
            const response = await axiosInstance.get(`/diseases/counts/${diseaseName}`);
            return response.data; // Expected to return array: [{ division: string, count: number }]
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Unable to fetch disease counts by division');
        }
    }
}

export default new DiseaseService();
