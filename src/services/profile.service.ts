import axiosInstance from "./axios/axiosInstance";

export default class ProfileService {
  async updateUserFullNameById(userId: number, fullName: string) {
    try {
      const response = await axiosInstance.put(`/user/${userId}/name`, {
        full_name: fullName,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to update user full name"
      );
    }
  }
}
