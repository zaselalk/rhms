import { RoleService } from "../RoleService";
import { RoleRepository } from "../../repositories/RoleRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { Role } from "../../models/role";
import User from "../../models/user";

jest.mock("../../repositories/RoleRepository");
jest.mock("../../repositories/UserRepository");

describe("RoleService", () => {
  let roleRepository: jest.Mocked<RoleRepository>;
  let roleService: RoleService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    roleRepository = new RoleRepository() as jest.Mocked<RoleRepository>;
    roleService = new RoleService(roleRepository);
    // Access the private userRepository through the service instance
    userRepository = (roleService as any).userRepository as jest.Mocked<UserRepository>;
  });

  describe("deleteRole", () => {
    it("Should delete role successfully when no users are associated", async () => {
      const roleId = 1;
      const mockRole = { id: roleId, role: "regular_role" } as Role;

      roleRepository.findById.mockResolvedValue(mockRole);
      userRepository.findUsersByRoleId.mockResolvedValue([]);
      roleRepository.delete.mockResolvedValue(1);

      await expect(roleService.deleteRole(roleId)).resolves.not.toThrow();
      expect(userRepository.findUsersByRoleId).toHaveBeenCalledWith(roleId);
      expect(roleRepository.delete).toHaveBeenCalledWith(roleId);
    });

    it("Should throw user-friendly error when role has associated users", async () => {
      const roleId = 1;
      const mockRole = { id: roleId, role: "regular_role" } as Role;
      const mockUsers = [
        { id: 1, name: "User 1", email: "user1@test.com" } as User,
      ];

      roleRepository.findById.mockResolvedValue(mockRole);
      userRepository.findUsersByRoleId.mockResolvedValue(mockUsers);

      await expect(roleService.deleteRole(roleId)).rejects.toThrow(
        "You can't delete this role, because it is associated with a user."
      );
      expect(userRepository.findUsersByRoleId).toHaveBeenCalledWith(roleId);
      expect(roleRepository.delete).not.toHaveBeenCalled();
    });

    it("Should throw forbidden error for super_user role", async () => {
      const roleId = 1;
      const mockRole = { id: roleId, role: "super_user" } as Role;

      roleRepository.findById.mockResolvedValue(mockRole);

      await expect(roleService.deleteRole(roleId)).rejects.toThrow(
        "Deleting the super_user role is forbidden."
      );
      expect(userRepository.findUsersByRoleId).not.toHaveBeenCalled();
      expect(roleRepository.delete).not.toHaveBeenCalled();
    });

    it("Should handle foreign key constraint error as fallback", async () => {
      const roleId = 1;
      const mockRole = { id: roleId, role: "regular_role" } as Role;

      roleRepository.findById.mockResolvedValue(mockRole);
      userRepository.findUsersByRoleId.mockResolvedValue([]);
      roleRepository.delete.mockRejectedValue(
        new Error("Cannot delete or update a parent row: a foreign key constraint fails")
      );

      await expect(roleService.deleteRole(roleId)).rejects.toThrow(
        "You can't delete this role, because it is associated with a user."
      );
      expect(roleRepository.delete).toHaveBeenCalledWith(roleId);
    });
  });
});