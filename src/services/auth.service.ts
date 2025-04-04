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
}

export default AuthServices;
