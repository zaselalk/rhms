import axiosInstance from "./axios/axiosInstance";

interface ReturnUser {
  id: number;
  name: string;
  email: string;
  role: {
    id: number;
    role: string;
    permission: string;
  };
  token: string;
}

class AuthServices {
  async login(email: string, password: string): Promise<ReturnUser> {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const data = response.data;
      localStorage.setItem("token", data.user.token);
      return data.user;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Could not authenticate you. Please try again.",
      );
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
    permissionList: string[],
  ) {
    try {
      const response = await axiosInstance.patch(`/role/${roleId}`, {
        roleName,
        permissionList,
      });

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to update User Role",
      );
    }
  }

  async deleteUserRole(roleId: string) {
    try {
      const response = await axiosInstance.delete(`/role/${roleId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to delete User Role",
      );
    }
  }

  async getRoleById(roleId: string) {
    try {
      const response = await axiosInstance.get(`/role/${roleId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch role by ID",
      );
    }
  }

  async checkToken() {
    try {
      const response = await axiosInstance.get("/auth/check");

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Unable to check token");
    }
  }
}

export default AuthServices;
