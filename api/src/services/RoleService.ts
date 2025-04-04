import { RoleRepository } from "../repositories/RoleRepository";

export class RoleService {
  constructor(private roleRepositroy: RoleRepository) {}

  createRole = async (role: string, permission: string[]) => {
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
    const updatedRole = await this.roleRepositroy.update(id, role, permission);
    return updatedRole;
  };
}
