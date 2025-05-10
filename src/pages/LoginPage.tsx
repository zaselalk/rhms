import { Button, Form, Input, Typography, Alert } from "antd";
import { useMutation } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import AuthServices from "../services/auth.service";
import { loginState } from "../types/login";
import { useAppDispatch, useAppSelector } from "../hooks/state/hooks";
import { login } from "../store/slices/authSlices";

const { Title } = Typography;

const LoginPage: FC = () => {
  const Auth = new AuthServices();
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [auth.isAuthenticated]);

  const mutation = useMutation({
    mutationFn: async ({ email, password }: loginState) => {
      const user = await Auth.login(email, password);
      dispatch(
        login({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.role,
          permissions: JSON.parse(user.role.permission),
        })
      );
    },
    onSuccess: () => {
      navigate("/admin/dashboard");
    },
    onError: (error: any) => {
      setError(error.message);
    },
  });

  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);

  const onFinish = (values: loginState) => {
    setError(null); // clear previous errors
    mutation.mutate(values);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <Title level={2} className="text-center text-blue-800 pt-12">
        Resident Health Monitoring System - Katugahahena Hospital
      </Title>
      <div className="flex justify-center items-center min-h-full gap-32 p-12">
        {/* Left Image Section */}
        <div className="w-1/2 bg-cover bg-center">
          <img src="/images/login_cover.svg" width={600} alt="Login Cover" />
        </div>

        {/* Right Login Form Section */}
        <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <Title level={3} className="text-center text-[#008FFB] mb-6">
              Staff Login
            </Title>

            {error && (
              <Alert message={error} type="error" showIcon className="mb-4" />
            )}

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
                <Button type="primary" htmlType="submit" className="w-full">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
