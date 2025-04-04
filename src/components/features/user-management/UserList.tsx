import { FC, useEffect, useState } from 'react';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Button, Modal, Space, Typography, message } from 'antd';
import { UserCreateModal } from './UserCreateModal';

const { Title } = Typography;

interface User {
    name: string;
    role: string;
}

interface UserListProps {
    setUserCount: (count: number) => void;
}

export const UserList: FC<UserListProps> = ({ setUserCount }) => {
    const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
    const [editingUserIndex, setEditingUserIndex] = useState<number | null>(null);

    const [userList, setUserList] = useState<User[]>([
        { name: "Asela Priyadarshana", role: "Surgeon" },
        { name: "Nimasha Jayasinghe", role: "Pediatrician" },
        { name: "Ravindu Madushanka", role: "Radiologist" },
        { name: "Dilukshi Perera", role: "Lab Technician" },
        { name: "Tharindu Silva", role: "Pharmacist" },
        { name: "Sanduni Weerasinghe", role: "Matron" },
        { name: "Chamika Fernando", role: "Medical Officer" },
        { name: "Isuru Rathnayake", role: "Emergency Responder" },
        { name: "Shanali Gunasekara", role: "Physiotherapist" },
        { name: "Malith Gamage", role: "Biomedical Engineer" },
        { name: "Hiruni Ranasinghe", role: "Receptionist" },
        { name: "Pasindu Jayalath", role: "Ward Attendant" },
        { name: "Gayani Dissanayake", role: "Infection Control Nurse" },
        { name: "Niroshan De Alwis", role: "Anesthesiologist" },
        { name: "Kavindya Senanayake", role: "Nutritionist" }
    ]);

    useEffect(() => {
        const totalUsers = userList.length;
        setUserCount(totalUsers);
    }, [setUserCount, userList]);

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
        const user = userList[index];


        const isconfirm = confirm("Are you sure, you wanna delete ?")
        if (isconfirm) {
            setUserList(prev => prev.filter((_, i) => i !== index));
            message.success('User deleted successfully');
        } else {
            message.error('Deletion cancelled');
        }
    };

    const handleSave = (user: User) => {
        if (editingUserIndex !== null) {
            const updatedList = [...userList];
            updatedList[editingUserIndex] = user;
            setUserList(updatedList);
            message.success('User updated successfully');
        } else {
            setUserList(prev => [...prev, user]);
            message.success('User created successfully');
        }

        setIsCreateUserOpen(false);
        setEditingUserIndex(null);
    };

    const handleModalClose = () => {
        setIsCreateUserOpen(false);
        setEditingUserIndex(null);
    };

    return (
        <>
            <UserCreateModal
                isOpen={isCreateUserOpen}
                handleClose={handleModalClose}
                onSave={handleSave}
                initialData={editingUserIndex !== null ? userList[editingUserIndex] : null}
                roles={roleOptions}
            />



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

                    <Table
                        dataSource={userList}
                        columns={columns}
                        rowKey={(record) => record.name + record.role}
                        pagination={{ pageSize: 8 }}
                    />
                </div>
            </div>
        </>
    );
};
