import { Modal, Avatar } from "antd";
import { User } from "./UserList";
import { UserOutlined } from "@ant-design/icons";
import { UserViewFullName } from "./view-user/UserViewFullName";
import { UserEmailViewComponent } from "./view-user/UserEmailBlock";
import { UserViewRole } from "./view-user/UserViewRole";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  initialData: User;
}

export const UserViewModal = ({ isOpen, handleClose, initialData }: Props) => {
  return (
    <Modal
      title="View User"
      open={isOpen}
      onCancel={handleClose}
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
          <UserViewFullName userFullName={initialData.name} />
          <UserEmailViewComponent email={initialData.email} />
        </div>

        <h3 className="text-lg font-bold">Permission</h3>
        <div className="flex justify-between px-24 gap-2 mt-4">
          <UserViewRole roleName="Surgeon" />

          <div className="w-1/2 flex items-baseline gap-2">
            <p>Permission List</p>
            <p className="text-gray-500"></p>
          </div>
        </div>
      </section>
    </Modal>
  );
};
