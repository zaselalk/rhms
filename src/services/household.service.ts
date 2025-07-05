import axiosInstance from "./axios/axiosInstance";


interface HouseholdPayload {
  house_no: string;
  grama_division: string;
  longitude: string;
  latitude: string;
  owner_id: number;
}

export const createHousehold = async (payload: HouseholdPayload) => {
  const response = await axiosInstance.post('/household/create', payload);
  return response.data;
};

export const getResidentById = async (residentId: number) => {
  const response = await axiosInstance.get(`/resident/${residentId}`);
  return response.data;
};

export const updateHouseholdOwner = async (house_no: number, owner_id: number) => {
  const response = await axiosInstance.put(`/household/update/${house_no}`, {
    owner_id,
  });
  return response.data;
};

export const deleteHousehold = async (house_no: string) => {
  try {
    const response = await axiosInstance.delete(`/household/delete/${house_no}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting household:', error);
    throw error;
  }
};
