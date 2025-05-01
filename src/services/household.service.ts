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
