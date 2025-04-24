import { Modal, Form, Avatar, Button } from "antd";
import { useEffect } from "react";
import { User } from "./UserList";
import { EditFilled, UserOutlined } from "@ant-design/icons";
import { UserViewFullName } from "./view-user/UserViewFullName";
import { UserEmailViewComponent } from "./view-user/UserEmailBlock";
import { UserViewRole } from "./view-user/UserViewRole";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  onSave: (user: User) => void;
  initialData: User | null;
}

export const UserViewModal = ({
  isOpen,
  handleClose,
  onSave,
  initialData,
}: Props) => {
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
      .then((values) => {
        onSave(values);
      })
      .catch((info) => {
        console.log("Validation failed:", info);
      });
  };

  return (
    <Modal
      title="View User"
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleClose}
      okText="Save"
      maskClosable={false}
      keyboard={true}
      width={1000}
      footer={null}
    >
      <section className="w-full">
        <div className="flex justify-between items-center gap-2">
          <Avatar size={64} icon={<UserOutlined />} />
        </div>
        <h3 className="text-lg font-bold mt-5">Basic Information</h3>
        <div className="flex justify-between px-24 gap-2 mt-4">
          <UserViewFullName userFullName="Asela" />
          <UserEmailViewComponent email="infoaselk@gmail.com" />
        </div>

        <h3 className="text-lg font-bold">Permission</h3>
        <div className="flex justify-between px-24 gap-2 mt-4">
          <UserViewRole roleName="Surgeon" />

          <div className="w-1/2 flex items-baseline gap-2">
            <p>Permission List</p>
            <p className="text-gray-500">Surgeon</p>
          </div>
        </div>
      </section>
      {/* User Full Name */}

      {/* <Form form={form} layout="vertical">
        <div className="flex gap-3"> */}

      {/* <Form.Item
            label="Full Name"
            className="w-3/5"
            name="name"
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item> */}

      {/* <Form.Item
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
              {roles.map((role) => (
                <Option key={role} value={role}>
                  {role}
                </Option>
              ))}
            </Select>
          </Form.Item> */}
      {/* </div> */}

      {/* <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please enter email' }]}
                >
                    <Input placeholder="Enter email" type="email" />
                </Form.Item> */}
      {/* <div className="flex justify-between gap-4"> */}
      {/* <Form.Item
            label="Password"
            name="password"
            className="w-full"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            className="w-full"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item> */}
      {/* </div>
      </Form> */}
    </Modal>
  );
};
