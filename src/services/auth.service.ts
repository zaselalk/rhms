class AuthServices {
  async login(email: string, password: string) {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // console.log(response.ok);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Could not authenticate you. Please try again."
      );
    }

    const data = await response.json();

    // save the token to local storage
    localStorage.setItem("token", data.user.token);
    return data;
  }

  async crateUserRole(roleName: string, permissionList: string[]) {
    const response = await fetch("http://localhost:3001/role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roleName, permissionList }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Unable to Create User");
    }

    const data = await response.json();
    return data;
  }

  async getAllRoles() {
    const response = await fetch("http://localhost:3001/role", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Unable to fetch roles");
    }

    const data = await response.json();
    return data;
  }

  async updateUserRole(
    roleId: string,
    roleName: string,
    permissionList: string[]
  ) {
    const response = await fetch(`http://localhost:3001/role/${roleId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roleName, permissionList }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Unable to update User Role");
    }

    const data = await response.json();
    return data;
  }

  async deleteUserRole(roleId: string) {
    const response = await fetch(`http://localhost:3001/role/${roleId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Unable to delete User Role");
    }

    const data = await response.json();
    return data;
  }

  async getRoleById(roleId: string) {
    console.log("Service", roleId);
    const response = await fetch(`http://localhost:3001/role/${roleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Unable to fetch role by ID");
    }

    const data = await response.json();
    return data;
  }
}

export default AuthServices;
