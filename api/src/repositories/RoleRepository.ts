import { PermissionRole } from "../models/permission-role";
import { Role } from "../models/role";

interface roleCreateAttributes {
  role: string;
}

export class RoleRepository {
  /**
   * Find the role by id
   * @param id  - The id of the role to find
   * @returns {Promise<Role | null>} - The role if found, otherwise null
   */
  async findById(id: number): Promise<Role | null> {
    return Role.findByPk(id);
  }

  /**
   * Create a new role
   * @param roleData
   * @returns
   */
  async create(roleName: roleCreateAttributes): Promise<Role> {
    return Role.create({
      role: roleName.role,
    });
  }

  /**
   * Add permission to role
   * @param roleId - The id of the role to add permission to
   * @param permissionId - The id of the permission to add to the role
   * @returns {Promise<Role | null>} - The role if found, otherwise null
   */

  async addPermissionToRole(
    role: Role,
    permission: PermissionRole
  ): Promise<Role | null> {
    await PermissionRole.create({
      roleId: role,
      permissionId: PermissionRole,
    });

    return role;
  }
}
