import { describe, it, expect, vi } from "vitest";
import ProfileService from "../profile.service";
import axiosInstance from "../axios/axiosInstance";

vi.mock("../axios/axiosInstance");

describe("ProfileService", () => {
  const profileService = new ProfileService();

  describe("updateUserFullNameById", () => {
    it("should update the user's full name successfully", async () => {
      const mockResponse = { data: { success: true } };
      (axiosInstance.put as any).mockResolvedValue(mockResponse);

      const userId = 1;
      const fullName = "John Doe";

      const result = await profileService.updateUserFullNameById(
        userId,
        fullName,
      );

      expect(axiosInstance.put).toHaveBeenCalledWith(`/user/${userId}/name`, {
        full_name: fullName,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("should throw an error if the API call fails", async () => {
      const errorMessage = "Unable to update user full name";
      (axiosInstance.put as any).mockRejectedValue({
        response: { data: { message: errorMessage } },
      });

      const userId = 1;
      const fullName = "John Doe";

      await expect(
        profileService.updateUserFullNameById(userId, fullName),
      ).rejects.toThrow(errorMessage);
    });
  });

  describe("updateUserPassword", () => {
    it("should update the user's password successfully", async () => {
      const mockResponse = { data: { success: true } };
      (axiosInstance.put as any).mockResolvedValue(mockResponse);

      const userId = 1;
      const password = "oldPassword";
      const newPassword = "newPassword";

      const result = await profileService.updateUserPassword(
        userId,
        password,
        newPassword,
      );

      expect(axiosInstance.put).toHaveBeenCalledWith(
        `/user/${userId}/password`,
        {
          password,
          new_password: newPassword,
        },
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should throw an error if the API call fails", async () => {
      const errorMessage = "Unable to update user password";
      (axiosInstance.put as any).mockRejectedValue({
        response: { data: { message: errorMessage } },
      });

      const userId = 1;
      const password = "oldPassword";
      const newPassword = "newPassword";

      await expect(
        profileService.updateUserPassword(userId, password, newPassword),
      ).rejects.toThrow(errorMessage);
    });
  });
});
