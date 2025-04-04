import { RoleRepository } from "../repositories/RoleRepository";
import { RoleService } from "../services/RoleService";

export class RoleController {
  private roleService: RoleService;

  constructor() {
    const roleRepository = new RoleRepository();
    this.roleService = new RoleService(roleRepository);
  }

  createRole = async (req: any, res: any): Promise<any> => {
    const { roleName, permissionList } = req.body;
    const newRole = await this.roleService.createRole(roleName, permissionList);
    return res.status(201).json({
      message: "Role created successfully",
      data: newRole,
    });
  };

  getAllRoles = async (req: any, res: any): Promise<any> => {
    const roles = await this.roleService.getAllRoles();
    return res.status(200).json({
      message: "Roles retrieved successfully",
      data: roles,
    });
  };

  getRoleById = async (req: any, res: any): Promise<any> => {
    const { id } = req.params;
    const role = await this.roleService.getRoleById(id);
    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }
    return res.status(200).json({
      message: "Role retrieved successfully",
      data: role,
    });
  };

  updateRole = async (req: any, res: any): Promise<any> => {
    const { id } = req.params;
    const { roleName, permissionList } = req.body;
    const updatedRole = await this.roleService.updateRole(
      id,
      roleName,
      permissionList
    );
    return res.status(200).json({
      message: "Role updated successfully",
      data: updatedRole,
    });
  };

  deleteRole = async (req: any, res: any): Promise<any> => {
    const { id } = req.params;
    await this.roleService.deleteRole(id);
    return res.status(200).json({
      message: "Role deleted successfully",
    });
  };

  //   addPermissionsToRole = async (req: any, res: any): Promise<any> => {
  //     const { roleId, permissionId } = req.body;
  //     const updatedRole = await this.roleService.addPermissionsToRole(
  //       roleId,
  //       permissionId
  //     );
  //     return res.status(200).json({
  //       message: "Permissions added to role successfully",
  //       data: updatedRole,
  //     });
  //   };
}
