import { Button, Input } from "antd";
import {
  CloseCircleOutlined,
  EditFilled,
  SaveOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

interface UserFullNameBlockProps {
  userFullName: string;
}

export const UserViewFullName = ({ userFullName }: UserFullNameBlockProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [fullName, setFullName] = useState(userFullName);

  /**
   *  useEffect to set the full name when the component mounts or when userFullName changes
   */
  useEffect(() => {
    setFullName(userFullName);
  }, [userFullName]);

  const handleFullNameChange = () => {
    setFullName(fullName);
    setIsEdit(false);
  };

  const handleFullNameCancel = () => {
    setFullName(userFullName);
    setIsEdit(false);
  };

  return (
    <div className="flex items-baseline gap-2">
      <p className="text-md">Full Name</p>
      <div className="flex">
        {!isEdit && (
          <>
            <p className="text-gray-500">{fullName}</p>
            <Button
              type="link"
              danger
              icon={<EditFilled />}
              onClick={() => setIsEdit(!isEdit)}
            >
              Edit
            </Button>
          </>
        )}

        {isEdit && (
          <>
            <Input
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Button
              type="primary"
              className="ml-2"
              icon={<SaveOutlined />}
              onClick={handleFullNameChange}
            >
              Save
            </Button>
            <Button
              type="primary"
              danger
              className="ml-2"
              icon={<CloseCircleOutlined />}
              onClick={handleFullNameCancel}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
