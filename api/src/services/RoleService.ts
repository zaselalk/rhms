import { RoleRepository } from "../repositories/RoleRepository";
import { logSuperUserAction } from "../util/superUserLogger";

export class RoleService {
  constructor(private roleRepositroy: RoleRepository) {}

  createRole = async (role: string, permission: string[]) => {
    if (role === "super_user") {
      logSuperUserAction({
        userId: "system",
        action: "Attempted to create super_user role via API",
      });
      throw new Error("Creating the super_user role via API is forbidden.");
    }
    const newRole = await this.roleRepositroy.create(role, permission);
    return newRole;
  };

  getAllRoles = async () => {
    const roles = await this.roleRepositroy.findAll();
    return roles;
  };

  getRoleById = async (id: number) => {
    const role = await this.roleRepositroy.findById(id);
    return role;
  };

  updateRole = async (id: number, role: string, permission: string) => {
    const foundRole = await this.roleRepositroy.findById(id);
    if (foundRole && foundRole.role === "super_user") {
      logSuperUserAction({
        userId: "system",
        action: `Attempted to update super_user role (id=${id}) via API`,
      });
      throw new Error("Modifying the super_user role is forbidden.");
    }
    const updatedRole = await this.roleRepositroy.update(id, role, permission);
    return updatedRole;
  };

  deleteRole = async (id: number) => {
    const foundRole = await this.roleRepositroy.findById(id);
    if (foundRole && foundRole.role === "super_user") {
      logSuperUserAction({
        userId: "system",
        action: `Attempted to delete super_user role (id=${id}) via API`,
      });
      throw new Error("Deleting the super_user role is forbidden.");
    }
    await this.roleRepositroy.delete(id);
  };
}
