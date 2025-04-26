import { FC, useEffect, useState } from "react";
import { PlusOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Table,
  Button,
  Modal,
  Space,
  Typography,
  message,
  Spin,
  Skeleton,
} from "antd";
import { UserCreateModal } from "./UserCreateModal";
import { useQuery } from "@tanstack/react-query";
import UserService from "../../../services/user.service";
import { UserViewModal } from "./UserViewModal";

const { Title } = Typography;

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserListProps {
  setUserCount: (count: number) => void;
}

export const UserList: FC<UserListProps> = ({ setUserCount }) => {
  const userService: UserService = new UserService();
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isUserEditing, setIsUserEditing] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getAllUsers(),
    staleTime: 1000 * 60 * 5, // cache for 5 mins
  });

  useEffect(() => {
    if (isLoading) return;

    setUserCount(data.limit); // write seperate api to get count
  }, [setUserCount, isLoading]);

  const handleUserView = (user: User) => {
    console.log(user);
    setIsUserEditing(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (data: User) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleUserView(data)}
          >
            View
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(data)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (user: User) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      content: `User: ${user.name}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        // Call the delete API or perform the delete action here
        message.success("User deleted successfully");
      },
      onCancel: () => {
        message.info("Deletion cancelled");
      },
    });
  };

  const handleSave = (user: User) => {};

  return (
    <>
      <UserCreateModal
        isOpen={isCreateUserOpen}
        handleClose={() => setIsCreateUserOpen(false)}
      />

      <UserViewModal
        isOpen={isUserEditing}
        handleClose={() => setIsUserEditing(false)}
        onSave={handleSave}
        initialData={null}
        // roles={roleOptions}
      />

      <div className="col-span-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <Title level={4} className="!mb-0">
              User List
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsCreateUserOpen(true)}
            >
              New User
            </Button>
          </div>
          <Spin spinning={isLoading} fullscreen />
          {isLoading && <Skeleton />}
          {error && <p>Error loading users: {error.message}</p>}

          {data && (
            <Table
              dataSource={data.data}
              columns={columns}
              pagination={{ pageSize: 10 }}
            />
          )}
        </div>
      </div>
    </>
  );
};
