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
import { useQuery, useMutation } from "@tanstack/react-query";
import UserService from "../../../services/user.service";
import { UserViewModal } from "./UserViewModal";
import { useUserContext } from "../../../pages/admin/UsersPage";
import { User } from "../../../services/types/user-services.types";

const { Title } = Typography;

export const UserList: FC = () => {
  const { setUserCount } = useUserContext();

  const userService: UserService = new UserService();
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isUserViewMode, setIsUserViewMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getAllUsers(),
    staleTime: 1000 * 60 * 5, // cache for 5 mins
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: number) => userService.deleteUser(userId),
    onSuccess: () => {
      message.success("User deleted successfully");
      refetch();
    },
    onError: (error: any) => {
      message.error(`Error deleting user: ${error.message}`);
    },
  });

  useEffect(() => {
    if (isLoading) return;

    if (!data) return;

    setUserCount(data.data.length); // write separate API to get count
  }, [setUserCount, data, isLoading]);

  // if data change while user is viewing, update the user state
  useEffect(() => {
    if (user) {
      // Find the updated user in the new data
      const updatedUser = data?.data.find((u: User) => u.id === user.id);

      // If the user is not found in the updated data, reset the user state
      if (updatedUser) {
        setUser(updatedUser);
      }
    }
  }, [data, user, setUser]);

  const handleUserView = (user: User) => {
    setUser(user);
    setIsUserViewMode(true);
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
      key: "email",
    },
    {
      title: "Role",
      key: "role",
      render: (record: User) => record.role.role,
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
        deleteUserMutation.mutate(user.id);
      },
      onCancel: () => {
        message.info("Deletion cancelled");
      },
    });
  };

  return (
    <>
      <UserCreateModal
        isOpen={isCreateUserOpen}
        handleClose={() => setIsCreateUserOpen(false)}
        refetch={refetch}
      />

      {user && (
        <UserViewModal
          isOpen={isUserViewMode}
          handleClose={() => setIsUserViewMode(false)}
          initialData={user}
          refetch={refetch}
        />
      )}

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
