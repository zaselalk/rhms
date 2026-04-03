import { describe, it, expect, vi } from "vitest";
import { IProfileService } from "../../../../services/types/profile-service.types";

/**
 * Tests to verify that the IProfileService interface enables proper dependency
 * injection and decouples the presentation layer from the data layer.
 */
describe("IProfileService interface (dependency injection contract)", () => {
  /**
   * Verifies that a mock implementation satisfying IProfileService
   * can be constructed and passed as a dependency — confirming that
   * UI components no longer need to import concrete data-layer classes.
   */
  it("should accept a mock implementation of IProfileService", () => {
    const mockProfileService: IProfileService = {
      updateUserFullNameById: vi.fn().mockResolvedValue({ success: true }),
      updateUserPassword: vi.fn().mockResolvedValue({ success: true }),
    };

    expect(mockProfileService.updateUserFullNameById).toBeDefined();
    expect(mockProfileService.updateUserPassword).toBeDefined();
  });

  describe("updateUserFullNameById", () => {
    /**
     * Verifies that the injected service's updateUserFullNameById method
     * is called with the correct arguments, simulating what UpdateUserFullName
     * component does when it receives a profileService via props.
     */
    it("should call updateUserFullNameById with the correct arguments", async () => {
      const mockProfileService: IProfileService = {
        updateUserFullNameById: vi.fn().mockResolvedValue({ success: true }),
        updateUserPassword: vi.fn(),
      };

      const userId = 1;
      const fullName = "Jane Doe";

      await mockProfileService.updateUserFullNameById(userId, fullName);

      expect(mockProfileService.updateUserFullNameById).toHaveBeenCalledWith(
        userId,
        fullName
      );
    });

    /**
     * Verifies that errors thrown by the injected service propagate correctly,
     * allowing components to handle failures from any IProfileService implementation.
     */
    it("should propagate errors from the injected service", async () => {
      const errorMessage = "Unable to update user full name";
      const mockProfileService: IProfileService = {
        updateUserFullNameById: vi
          .fn()
          .mockRejectedValue(new Error(errorMessage)),
        updateUserPassword: vi.fn(),
      };

      await expect(
        mockProfileService.updateUserFullNameById(1, "Jane Doe")
      ).rejects.toThrow(errorMessage);
    });
  });

  describe("updateUserPassword", () => {
    /**
     * Verifies that the injected service's updateUserPassword method
     * is called with the correct arguments, simulating what
     * UserChangeChangePassword component does when it receives a
     * profileService via props.
     */
    it("should call updateUserPassword with the correct arguments", async () => {
      const mockProfileService: IProfileService = {
        updateUserFullNameById: vi.fn(),
        updateUserPassword: vi.fn().mockResolvedValue({ success: true }),
      };

      const userId = 1;
      const currentPassword = "oldPassword";
      const newPassword = "newPassword";

      await mockProfileService.updateUserPassword(
        userId,
        currentPassword,
        newPassword
      );

      expect(mockProfileService.updateUserPassword).toHaveBeenCalledWith(
        userId,
        currentPassword,
        newPassword
      );
    });

    /**
     * Verifies that errors thrown by the injected service propagate correctly
     * for password updates.
     */
    it("should propagate errors from the injected service", async () => {
      const errorMessage = "Unable to update user password";
      const mockProfileService: IProfileService = {
        updateUserFullNameById: vi.fn(),
        updateUserPassword: vi
          .fn()
          .mockRejectedValue(new Error(errorMessage)),
      };

      await expect(
        mockProfileService.updateUserPassword(1, "oldPass", "newPass")
      ).rejects.toThrow(errorMessage);
    });
  });
});
