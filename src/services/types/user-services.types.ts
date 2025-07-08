import { userRole } from "./user-role.types";

/**
 * Response structure for fetching all users.
 * @property {Array} data - Array of user objects.
 * @property {string} message - Response message.
 * @property {string} status - Response status.
 * @property {number} limit - Number of users per page.
 * @property {number} page - Current page number.
 * @typedef {Object} GetAllUsersResponse
 */
export interface GetAllUsersResponse {
  data: [
    {
      id: number;
      name: string;
      email: string;
      created_at: string;
      role: {
        id: number;
        role: string;
        permission: string;
      };
    }
  ];
  message: string;
  status: string;
  limit: number;
  page: number;
}

/**
 * Response structure for user role operations.
 * @property {userRole} data - The user role object.
 * @property {string} message - Response message.
 */
export interface UserRoleResponse {
  data: userRole;
  message: string;
}

/** * Response structure for deleting a user role.
 * @property {string} message - Response message.
 * */
export interface DeleteUserRoleResponse {
  message: string;
}

/**
 * Response structure for creating a user role.
 * @property {userRole} data - The created user role object.
 * @property {string} message - Response message.
 * @property {string} status - Response status.
 * @property {string} error - Error message if any.
 */
export interface CreateUserRoleResponse {
  data: userRole;
  message: string;
  status: string;
  error: string;
}

/**
 * Response structure for updating a user role.
 * @property {userRole} data - The updated user role object.
 * @property {string} message - Response message.
 * @property {string} status - Response status.
 * @property {string} error - Error message if any.
 */
export interface UpdateUserRoleResponse {
  data: userRole;
  message: string;
  status: string;
  error: string;
}

/**
 * Response structure for deleting a user.
 * @property {string} message - Response message.
 * @property {string} status - Response status.
 * @property {null} data - Data field, usually null for delete operations.
 * @property {string} error - Error message if any.
 */
export interface DeleteUserResponse {
  message: string;
  status: string;
  data: null;
  error: string;
}
