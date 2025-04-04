import Permission from "../models/permission";
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

  async findPermissionByName(permissionName: string) {
    return Permission.findOne({
      where: {
        permission: permissionName,
      },
    });
  }

  /**
   * Create a new role
   * @param roleData
   * @returns
   */
  async create(roleName: string, permissions: string[]): Promise<Role> {
    return Role.create({
      role: roleName,
      permission: JSON.stringify(permissions),
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
    // Find the role by id
    const foundRole = await Role.findByPk(role.id, {
      include: PermissionRole,
    });
    if (!foundRole) {
      return null;
    }
    // Check if the permission already exists in the role
    const permissionExists = await foundRole.hasPermission(permission);
    if (permissionExists) {
      return foundRole;
    }
    // Add the permission to the role
    await foundRole.addPermission(permission);

    return role;
  }
}
