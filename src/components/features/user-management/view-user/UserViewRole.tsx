import { Button, Select } from "antd";
import {
  CloseCircleOutlined,
  EditFilled,
  SaveOutlined,
} from "@ant-design/icons";
import { Option } from "antd/es/mentions";
import { useState } from "react";

interface UserViewRoleProps {
  roleName: string;
}

export const UserViewRole = ({ roleName }: UserViewRoleProps) => {
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [newRole, setNewRole] = useState<string>(roleName);

  const handleRoleChangeSave = () => {
    console.log(newRole);
    // send the request to the server to update the role
    setIsEdit(false);
  };

  const handleNewRoleChangeCancel = () => {
    setNewRole(roleName);
    setIsEdit(false);
  };

  const roles = [
    "Surgeon",
    "Pediatrician",
    "Radiologist",
    "Lab Technician",
    "Pharmacist",
    "Matron",
    "Medical Officer",
    "Emergency Responder",
    "Physiotherapist",
    "Biomedical Engineer",
    "Receptionist",
    "Ward Attendant",
    "Infection Control Nurse",
    "Anesthesiologist",
    "Nutritionist",
  ];

  return (
    <div className="w-1/2 flex items-baseline gap-2">
      <p>Role</p>

      {!isEdit && (
        <>
          <p className="text-gray-500">{newRole}</p>
          <Button
            type="link"
            danger
            icon={<EditFilled />}
            onClick={() => setIsEdit(!isEdit)}
          >
            Change
          </Button>
        </>
      )}

      {isEdit && (
        <>
          <Select
            placeholder="Select role"
            showSearch
            optionFilterProp="children"
            allowClear
            onChange={(value) => setNewRole(value)}
            value={newRole}
          >
            {roles.map((role) => (
              <Option key={role} value={role}>
                {role}
              </Option>
            ))}
          </Select>

          <Button
            type="primary"
            className="ml-2"
            icon={<SaveOutlined />}
            onClick={handleRoleChangeSave}
          >
            Save
          </Button>
          <Button
            type="primary"
            danger
            className="ml-2"
            icon={<CloseCircleOutlined />}
            onClick={handleNewRoleChangeCancel}
          >
            Cancel
          </Button>
        </>
      )}
    </div>
  );
};
