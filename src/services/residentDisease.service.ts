import axiosInstance from './axios/axiosInstance';

class ResidentDiseaseService {
  // Create a resident-disease association
  async createResidentDisease(payload: { residentId: number; diseaseId: number }) {
    try {
      const response = await axiosInstance.post('/residentDisease/createResidentDisease', payload);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Unable to create resident-disease association');
    }
  }

  // Get all resident-disease associations
  async getAllResidentDiseases() {
    try {
      const response = await axiosInstance.get('/residentDisease/getAllResidentDiseases');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Unable to fetch resident-disease associations');
    }
  }

  // Get diseases by resident ID
  async getDiseasesByResidentId(residentId: number) {
    try {
      const response = await axiosInstance.get('/residentDisease/getDiseasesByResidentId', {
        params: { residentId },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Unable to fetch diseases for resident');
    }
  }

  // Get residents by disease ID
  async getResidentsByDiseaseId(diseaseId: number) {
    try {
      const response = await axiosInstance.get('/residentDisease/getResidentsByDiseaseId', {
        params: { diseaseId },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Unable to fetch residents for disease');
    }
  }

  // Get division counts by disease name
  async getDivisionCountsByDiseaseName(diseaseName: string) {
    console.log('calling backend with disease name: ', diseaseName);
    try {
      const response = await axiosInstance.get(`/residentDisease/divisionCountsByDisease/${diseaseName}`);
      console.log("Received response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching division counts:", error);
      throw new Error(error.response?.data?.message || 'Unable to fetch division counts');
    }
  }

  // Delete by resident ID
  async deleteByResidentId(residentId: number) {
    try {
      const response = await axiosInstance.delete('/residentDisease/deleteByResidentId', {
        data: { residentId },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Unable to delete by resident ID');
    }
  }

  // Delete by disease ID
  async deleteByDiseaseId(diseaseId: number) {
    try {
      const response = await axiosInstance.delete('/residentDisease/deleteByDiseaseId', {
        data: { diseaseId },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Unable to delete by disease ID');
    }
  }

  // Update by resident ID
  async updateByResidentId(payload: { diseaseId: number; residentId: number }) {
    try {
      const response = await axiosInstance.put('/residentDisease/updateByResidentId', payload);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Unable to update by resident ID');
    }
  }

  // Update by disease ID
  async updateByDiseaseId(payload: { residentId: number; diseaseId: number }) {
    try {
      const response = await axiosInstance.put('/residentDisease/updateByDiseaseId', payload);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Unable to update by disease ID');
    }
  }

  //getpations count by disease id
  async getPatientsCountByDiseaseId(diseaseId: number) {
    try {
      const response = await axiosInstance.get(`/residentDisease/PCountByDiseaseId/${diseaseId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Unable to fetch patient count by disease ID');
    }
  }

  // Get all diseases with patient count
  async getAllDiseasesWithPatientCount() {
    try {
      const response = await axiosInstance.get('/residentDisease/getAllDiseasesWithPatientCount');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Unable to fetch all diseases with patient count');
    }
  }
}

export default new ResidentDiseaseService();
