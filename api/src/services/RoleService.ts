import { RoleRepository } from "../repositories/RoleRepository";

export class RoleService {
  constructor(private roleRepositroy: RoleRepository) {}

  createRole = async (role: string, permissions: string[]) => {
    const newRole = await this.roleRepositroy.create(role, permissions);

    return newRole;
  };

  getRoleById = async (id: number) => {
    const role = await this.roleRepositroy.findById(id);
    return role;
  };
}
