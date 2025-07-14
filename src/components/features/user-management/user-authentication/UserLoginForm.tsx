import { Button, Form, FormInstance, Input } from "antd";
import { FC } from "react";
import { Link } from "react-router";

interface UserLoginFormProps {
  form: FormInstance;
  onFinish: (values: any) => void;
  isLoading?: boolean;
}

export const UserLoginForm: FC<UserLoginFormProps> = ({
  form,
  onFinish,
  isLoading,
}) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ email: "", password: "" }}
    >
      {/* Email Input */}
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Invalid email format" },
        ]}
      >
        <Input placeholder="Enter your email address" />
      </Form.Item>

      {/* Password Input */}
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Password is required" }]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      {/* Login Button */}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          loading={isLoading}
        >
          {isLoading ? " Logging in..." : "Login"}
        </Button>
      </Form.Item>

      <Link
        to="/resident/login"
        className="text-sm text-blue-600 hover:underline block text-center"
      >
        Resident Login
      </Link>
    </Form>
  );
};
