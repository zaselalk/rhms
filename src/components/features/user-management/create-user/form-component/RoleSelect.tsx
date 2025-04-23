import { Form, Select } from "antd";
import { RoleData, RolesResponse } from "../../../../../types/role";
const { Option } = Select;

interface RoleSelectProps {
  /**
   * Roles data fetched from the API.
   */
  roles: RolesResponse;
}

const RoleSelect = ({ roles }: RoleSelectProps) => (
  <Form.Item
    label="Role"
    name="role"
    className="w-2/5"
    rules={[{ required: true, message: "Please select a role" }]}
  >
    <Select
      placeholder="Select role"
      showSearch
      optionFilterProp="children"
      allowClear
    >
      {roles.data.map((role: RoleData) => (
        <Option key={role.id} value={role.id}>
          {role.role}
        </Option>
      ))}
    </Select>
  </Form.Item>
);

export default RoleSelect;
