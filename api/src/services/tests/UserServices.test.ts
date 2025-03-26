import { UserServices } from "../UserServices";
import { UserRepository } from "../../repositories/UserRepository";
import User from "../../models/user";

jest.mock("../../repositories/UserRepository");

describe("UserServices", () => {
  let userRepository: jest.Mocked<UserRepository>;
  let userServices: UserServices;

  beforeEach(() => {
    userRepository = new UserRepository() as jest.Mocked<UserRepository>;
    userServices = new UserServices(userRepository);
  });

  it("Should registerd user successfully", async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.createUser.mockResolvedValue({
      id: 1,
      name: "Test User",
      email: "test@gmail.com",
      password: "hashedPassword",
    } as User);

    const user = await userServices.registerUser(
      "Test User",
      "test@tes.com",
      "password"
    );

    expect(userRepository.createUser).toHaveBeenCalled();
    expect(user).toEqual({
      id: 1,
      name: "Test User",
      email: "test@gmail.com",
      password: "hashedPassword",
    });
  });

  it("Throw error if user already exists", async () => {
    //mocking the findByEmail method to return a user
    userRepository.findByEmail.mockResolvedValue({
      id: 1,
      name: "Test User",
      email: "test@gmail.com",
      password: "hashedPassword",
    } as User);

    await expect(
      userServices.registerUser("Test User", "test@gmailc.om", "password")
    ).rejects.toThrowError("Email already in use");
  });
});
