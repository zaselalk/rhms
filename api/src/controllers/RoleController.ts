import { RoleRepository } from "../repositories/RoleRepository";
import { RoleService } from "../services/RoleService";

export class RoleController {
  private roleService: RoleService;

  constructor() {
    const roleRepository = new RoleRepository();
    this.roleService = new RoleService(roleRepository);
  }

  createRole = async (req: any, res: any): Promise<any> => {
    const { roleName, permisionList } = req.body;
    const newRole = await this.roleService.createRole(roleName, permisionList);
    return res.status(201).json({
      message: "Role created successfully",
      data: newRole,
    });
  };

  //   getAllRoles = async (req: any, res: any): Promise<any> => {
  //     const roles = await this.roleService.getAllRoles();
  //     return res.status(200).json({
  //       message: "Roles retrieved successfully",
  //       data: roles,
  //     });
  //   };

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
