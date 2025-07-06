// src/services/household.service.ts

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

export const getResidentById = async (residentId: number | string) => {
  const response = await axiosInstance.get(`/resident/${residentId}`);
  return response.data;
};

export const updateHouseholdOwner = async (
  house_no: string | number,
  owner_id: number | string
) => {
  const response = await axiosInstance.put(`/household/update/${house_no}`, { owner_id });
  return response.data;
};

export const deleteHousehold = async (house_no: string) => {
  const response = await axiosInstance.delete(`/household/delete/${house_no}`);
  return response.data;
};

export const fetchAllHouseholds = async () => {
  const response = await axiosInstance.get("/household/read");
  return response.data;
};

export const fetchResidentCount = async () => {
  const response = await axiosInstance.get("/resident/residentCount");
  return response.data.data.count;
};

export const searchResidentById = async (residentId: number | string) => {
  const response = await axiosInstance.get(`/resident/id/${residentId}`);
  return response.data.data;
};
