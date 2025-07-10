import { Button, Checkbox, Form, Input, message } from "antd";
import { FC, useState } from "react";
import allPermissions from "./data/allPermission";
import { NewUserRole } from "../../../../services/types/user-role.types";
import { useMutation } from "@tanstack/react-query";
import UserService from "../../../../services/user.service";
import { PermissionCard } from "./PermissionCard";

interface UserRoleCreateFormProps {
  refetch: () => void;
  setIsCreateNewRole: (isOpen: boolean) => void;
}

export const UserRoleCreateForm: FC<UserRoleCreateFormProps> = ({
  refetch,
  setIsCreateNewRole,
}) => {
  const [form] = Form.useForm();
  const [isAllSelected, setIsAllSelected] = useState(false);
  //   const [messageApi, contextHolder] = message.useMessage();

  // initialize user service
  const User = new UserService();

  /**
   *  Handles the selection of all permissions.
   * @param checked - boolean value to check if all permissions are selected
   */
  const handleSelectAll = (checked: boolean) => {
    setIsAllSelected(checked);
    if (checked) {
      const allPerms = allPermissions.reduce<string[]>(
        (acc, { perms }) => [...acc, ...perms],
        []
      );
      form.setFieldsValue({ permission: allPerms });
    } else {
      form.setFieldsValue({ permission: [] });
    }
  };

  /**
   * user role create mutation
   */
  const mutation = useMutation({
    mutationFn: async ({ role, permission }: NewUserRole) => {
      await User.crateUserRole(role, permission);
    },
    onSuccess: () => {
      message.success("New User Role Created!");
      form.resetFields();
      refetch();
      setIsCreateNewRole(false);
    },
    onError: (error: any) => {
      message.error(error.message);
    },
  });

  /**
   * Send a http request to create a new user role.
   * @param values - The values from the form
   */
  const handleSubmit = (values: NewUserRole) => {
    mutation.mutate(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ roleName: "", permissionList: [] }}
    >
      <Form.Item
        label="Role Name"
        name="role"
        rules={[{ required: true, message: "Role name is required" }]}
      >
        <Input placeholder="Enter role name" />
      </Form.Item>

      <Form.Item
        label="Permissions"
        name="permission"
        rules={[{ required: true, message: "Select at least one permission" }]}
      >
        <Checkbox.Group style={{ width: "100%" }}>
          {allPermissions.map(({ group, perms }) => (
            // <div
            //   key={group}
            //   style={{
            //     marginBottom: "2rem",
            //     padding: "1rem",
            //     border: "1px solid #d9d9d9",
            //     borderRadius: "8px",
            //   }}
            // >
            //   <strong
            //     style={{
            //       display: "block",
            //       marginBottom: "0.5rem",
            //       fontSize: "1.1rem",
            //     }}
            //   >
            //     {group}
            //   </strong>
            //   <div
            //     style={{
            //       display: "grid",
            //       gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            //       gap: "1rem",
            //     }}
            //   >
            //     {perms.map((perm) => (
            //       <Checkbox key={perm} value={perm}>
            //         {perm.split(":")[1]}
            //       </Checkbox>
            //     ))}
            //   </div>
            // </div>
            <PermissionCard key={group} title={group} permissions={perms} />
          ))}
        </Checkbox.Group>
      </Form.Item>

      <Form.Item>
        <Checkbox
          onChange={(e) => handleSelectAll(e.target.checked)}
          checked={isAllSelected}
        >
          {isAllSelected ? "Unselect All" : "Select All"}
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button onClick={() => form.resetFields()} danger>
            Clear
          </Button>
          <Button type="primary" htmlType="submit">
            Create Role
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
