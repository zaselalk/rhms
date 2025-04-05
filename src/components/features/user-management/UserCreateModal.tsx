import { Modal, Form, Input, Select } from 'antd';
import { useEffect } from 'react';

const { Option } = Select;

interface User {
    name: string;
    role: string;
}

interface Props {
    isOpen: boolean;
    handleClose: () => void;
    onSave: (user: User) => void;
    initialData: User | null;
    roles: string[]; // List of role options passed from parent
}

export const UserCreateModal = ({ isOpen, handleClose, onSave, initialData, roles }: Props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue(initialData);
        } else {
            form.resetFields();
        }
    }, [initialData, form]);

    const handleSubmit = () => {
        form
            .validateFields()
            .then(values => {
                onSave(values);
            })
            .catch(info => {
                console.log('Validation failed:', info);
            });
    };

    return (
        <Modal
            title={initialData ? 'Edit User' : 'Create New User'}
            open={isOpen}
            onOk={handleSubmit}
            onCancel={handleClose}
            okText="Save"
        >
            <Form form={form} layout="vertical">
                <div className="flex gap-3">
                    <Form.Item
                        label="Full Name"
                        className='w-3/5'
                        name="name"
                        rules={[{ required: true, message: 'Please enter full name' }]}
                    >
                        <Input placeholder="Enter full name" />
                    </Form.Item>

                    <Form.Item
                        label="Role"
                        name="role"
                        className='w-2/5'
                        rules={[{ required: true, message: 'Please select a role' }]}
                    >
                        <Select
                            placeholder="Select role"
                            showSearch
                            optionFilterProp="children"
                            allowClear
                        >
                            {roles.map(role => (
                                <Option key={role} value={role}>
                                    {role}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please enter email' }]}
                >
                    <Input placeholder="Enter email" type="email" />
                </Form.Item>
                <div className="flex justify-between gap-4">

                    <Form.Item
                        label="Password"
                        name="password"
                        className='w-full'
                        rules={[{ required: true, message: 'Please enter password' }]}
                    >
                        <Input.Password placeholder="Enter password" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        className='w-full'
                        rules={[{ required: true, message: 'Please enter password' }]}
                    >
                        <Input.Password placeholder="Enter password" />
                    </Form.Item>
                </div>

            </Form>
        </Modal>
    );
};
