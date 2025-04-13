export default class UserService {
  async getAllUsers() {
    const response = await fetch("http://localhost:3001/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Unable to fetch users");
    }

    const data = await response.json();
    console.log(data);
    return data;
  }
}
