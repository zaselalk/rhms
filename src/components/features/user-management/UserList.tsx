import { FC, useEffect, useState } from 'react';
import { PlusOutlined, EditOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { Table, Button, Modal, Space, Typography, message, Spin } from 'antd';
import { UserCreateModal } from './UserCreateModal';
import { useQuery } from '@tanstack/react-query';
import UserService from '../../../services/user.service';
import { useRoles } from '../../../hooks/useRoles';

const { Title } = Typography;

interface User {
    name: string;
    role: string;
}

interface UserListProps {
    setUserCount: (count: number) => void;
}

export const UserList: FC<UserListProps> = ({ setUserCount }) => {
    const userService: UserService = new UserService();
    const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
    const [editingUserIndex, setEditingUserIndex] = useState<number | null>(null);


    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: () => userService.getAllUsers(),
        staleTime: 1000 * 60 * 5 // cache for 5 mins
    });


    useEffect(() => {
        if (isLoading) return;
        console.log(data)

        // const totalUsers = userList.length;
        setUserCount(3);
    }, [setUserCount, isLoading]);

    const roleOptions = [
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
        "Nutritionist"
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: User, index: number) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(index)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(index)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleEdit = (index: number) => {
        setEditingUserIndex(index);
        setIsCreateUserOpen(true);
    };

    const handleDelete = (index: number) => {
        // const user = userList[index];


        // const isconfirm = confirm("Are you sure, you wanna delete ?")
        // if (isconfirm) {
        //     setUserList(prev => prev.filter((_, i) => i !== index));
        //     message.success('User deleted successfully');
        // } else {
        //     message.error('Deletion cancelled');
        // }
    };

    const handleSave = (user: User) => {
        // if (editingUserIndex !== null) {
        //     const updatedList = [...userList];
        //     updatedList[editingUserIndex] = user;
        //     setUserList(updatedList);
        //     message.success('User updated successfully');
        // } else {
        //     setUserList(prev => [...prev, user]);
        //     message.success('User created successfully');
        // }

        // setIsCreateUserOpen(false);
        // setEditingUserIndex(null);
    };

    const handleModalClose = () => {
        setIsCreateUserOpen(false);
        setEditingUserIndex(null);
    };

    return (
        <>
            {/* <UserCreateModal
                isOpen={isCreateUserOpen}
                handleClose={handleModalClose}
                onSave={handleSave}
                initialData={editingUserIndex !== null ? userList[editingUserIndex] : null}
                roles={roles}
            /> */}



            <div className="col-span-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <Title level={4} className="!mb-0">User List</Title>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                setEditingUserIndex(null);
                                setIsCreateUserOpen(true);
                            }}
                        >
                            New User
                        </Button>
                    </div>
                    <Spin spinning={isLoading} fullscreen />
                    {isLoading && <Spin />}
                    {error && <p>Error loading users: {error.message}</p>}

                    {data && (<Table
                        dataSource={data.data}
                        columns={columns}
                        rowKey={(record) => record.name + record.role}
                        pagination={{ pageSize: 10 }}
                    />)}
                </div>
            </div>
        </>
    );
};
