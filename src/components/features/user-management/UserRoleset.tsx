import { useEffect, useState } from "react";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { UserRoleCreateModal } from "./UserRoleCreateModal";
import { useRoles } from "../../../hooks/useRoles";
import { UserRoleUpdateModal } from "./UserRoleUpdateModal";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import { useUserContext } from "../../../pages/admin/UsersPage";

export const UserRoleset = () => {
  const { setUserRoleCount } = useUserContext();

  const [isCreateNewRole, setIsCreateNewRole] = useState(false);
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const [roleId, setRoleId] = useState<string>("");
  const { data: roles = [], isLoading, error, refetch } = useRoles();

  useEffect(() => {
    const totalRoles = roles.data ? roles.data.length : 0;
    setUserRoleCount(totalRoles);
  }, [roles]);

  const handleRoleEdit = (roleId: string) => {
    setRoleId(roleId);
    setIsUpdatingRole(true);
  };

  const handleRoleDelete = (roleId: string) => {
    setRoleId(roleId);
    let isConfirm = confirm("Are you sure, you wanna delete ?");
    if (isConfirm) {
      // Call delete API here
      fetch(`http://localhost:3001/role/${roleId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Role deleted successfully");
            refetch();
          } else {
            alert("Failed to delete role");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error deleting role");
        });
    }
    return;
  };

  return (
    <div className="col-span-4">
      <UserRoleCreateModal
        isCreateNewRole={isCreateNewRole}
        setIsCreateNewRole={setIsCreateNewRole}
        refetch={refetch}
      />
      {roleId && (
        <UserRoleUpdateModal
          isUpdatingRole={isUpdatingRole}
          setIsUpdatingRole={setIsUpdatingRole}
          roleId={roleId}
        />
      )}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <Title level={4} className="!mb-0">
            User Roles
          </Title>
          <Button
            onClick={() => setIsCreateNewRole(true)}
            type="primary"
            icon={<UsergroupAddOutlined />}
          >
            New Role
          </Button>
        </div>
        {isLoading ? (
          <p className="mt-4 text-sm text-gray-600">Loading roles...</p>
        ) : error ? (
          <p className="mt-4 text-sm text-red-500">Failed to fetch roles.</p>
        ) : (
          <table className="w-full table-auto mt-4">
            <thead>
              <tr>
                <th className="text-left px-4 py-2 text-sm text-gray-600">
                  Role
                </th>
                <th className="text-left px-4 py-2 text-sm text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {roles.data &&
                roles.data.map((role: any, index: any) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {role.role}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      <button className="text-[#008FFB] hover:text-[#00C1A7] cursor-pointer">
                        <i
                          className="fas fa-edit"
                          onClick={() => handleRoleEdit(role.id)}
                        >
                          Edit
                        </i>
                      </button>
                      <button
                        className="ml-4 text-red-500 hover:text-red-700"
                        onClick={() => handleRoleDelete(role.id)}
                      >
                        <i className="fas fa-trash-alt">Delete</i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
