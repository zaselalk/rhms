import { Button, Form, FormInstance, Input } from "antd";
import { FC } from "react";
import { Link } from "react-router";

interface UserLoginFormProps {
  form: FormInstance;
  onFinish: (values: any) => void;
}

export const UserLoginForm: FC<UserLoginFormProps> = ({ form, onFinish }) => {
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
        <Input placeholder="Enter your email address" size="large" />
      </Form.Item>

      {/* Password Input */}
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Password is required" }]}
      >
        <Input.Password placeholder="Enter your password" size="large" />
      </Form.Item>

      {/* Login Button */}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          size="large"
        >
          Login
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
