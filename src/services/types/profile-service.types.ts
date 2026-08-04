/**
 * Interface representing the contract for profile-related service operations.
 * Abstracts the data layer from the presentation layer to follow clean
 * architecture principles.
 */
export interface IProfileService {
  /**
   * Updates the full name of a user by their ID.
   * @param userId - Unique identifier of the user.
   * @param fullName - The new full name to set.
   */
  updateUserFullNameById(userId: number, fullName: string): Promise<unknown>;

  /**
   * Updates the password of the currently logged-in user.
   * @param userId - Unique identifier of the user.
   * @param password - The current password.
   * @param newPassword - The new password to set.
   */
  updateUserPassword(
    userId: number,
    password: string,
    newPassword: string
  ): Promise<unknown>;
}
