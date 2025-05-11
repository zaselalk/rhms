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
}

export default new DiseaseService();
