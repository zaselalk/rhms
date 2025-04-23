import axiosInstance from "./axios/axiosInstance";

export default class UserService {
  async getAllUsers() {
    try {
      const response = await axiosInstance.get("/user");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Unable to fetch users");
    }
  }

  async crateUserRole(roleName: string, permissionList: string[]) {
    try {
      const response = await axiosInstance.post("/role", {
        roleName,
        permissionList,
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Unable to Create User");
    }
  }

  async getAllRoles() {
    try {
      const response = await axiosInstance.get("/role");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Unable to fetch roles");
    }
  }

  async updateUserRole(
    roleId: string,
    roleName: string,
    permissionList: string[]
  ) {
    try {
      const response = await axiosInstance.patch(`/role/${roleId}`, {
        roleName,
        permissionList,
      });

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to update User Role"
      );
    }
  }

  async deleteUserRole(roleId: string) {
    try {
      const response = await axiosInstance.delete(`/role/${roleId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to delete User Role"
      );
    }
  }

  async getRoleById(roleId: string) {
    try {
      const response = await axiosInstance.get(`/role/${roleId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch role by ID"
      );
    }
  }

  async createUser(
    full_name: string,
    email: string,
    password: string,
    role_id: number
  ) {
    try {
      const response = await axiosInstance.post("/user", {
        full_name,
        email,
        password,
        role_id,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Unable to create user");
    }
  }
}
