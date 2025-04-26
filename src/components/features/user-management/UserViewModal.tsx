import { Modal, Form, Avatar } from "antd";
import { useEffect } from "react";
import { User } from "./UserList";
import { UserOutlined } from "@ant-design/icons";
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
    </Modal>
  );
};
