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
  const response = await axiosInstance.post("/household/create", payload);
  return response.data;
};


export const updateHouseholdOwner = async (
  id: string | number,
  owner_id: number | string,
) => {
  const response = await axiosInstance.put(`/household/update/${id}`, {
    owner_id,
  });
  return response.data;
};

export const deleteHousehold = async (id: number ) => {
  const response = await axiosInstance.delete(`/household/delete/${id}`);
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

export const searchResidentById = async (residentId: number) => {
  const response = await axiosInstance.get(`/resident/id/${residentId}`);
  return response.data.data;
};

// Get households by division
export const getHouseholdsByDivision = async (division: string) => {
  try {
    const response = await axiosInstance.get(
      `/household/division/${division}`
    );
    return response.data; 
  } catch (error) {
    console.error("Error fetching households by division:", error);
    throw error;
  }


};


// Get household count by division
export const getHouseholdCountByDivision = async (division: string) => {
  try {
    const response = await axiosInstance.get(
      `/household/division/${division}`
    );
    return response.data.data.count;
  } catch (error) {
    console.error("Error fetching household count by division:", error);
    throw error;
  }
}

export const getHouseholdsByOwnerId = async (ownerId: number) => {
  const res = await axiosInstance.get(`/household/by-owner/${ownerId}`);
  return res.data.data;

};

