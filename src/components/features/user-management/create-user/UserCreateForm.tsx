import { Form, FormInstance } from "antd";
import InputFullName from "./form-component/InputFullName";
import RoleSelect from "./form-component/RoleSelect";
import InputEmail from "./form-component/InputEmail";
import ConfirmPassword from "./form-component/ConfirmPassword";
import { RolesResponse } from "../../../../types/role";

/**
 * UserCreateFormProps defines the shape of the props for the UserCreateForm component.
 */
interface UserCreateForm {
  /** Ant Design form instance */
  form: FormInstance;
  /** Roles data fetched from the API */
  roles: RolesResponse;
}

/**
 * Renders a user creation form with fields for full name, role selection, email, and password confirmation.
 */
const UserCreateForm = ({ form, roles }: UserCreateForm) => {
  return (
    <Form form={form} layout="vertical">
      <div className="flex gap-3">
        <InputFullName />
        <RoleSelect roles={roles} />
      </div>
      <InputEmail />
      <ConfirmPassword />
    </Form>
  );
};

export default UserCreateForm;
