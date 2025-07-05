import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginState } from "../../types/login";
import ResidentService from "../../services/resident.service";
import { Alert, Button, Form, Input } from "antd";

const ResidentLoginPage: FC = () => {
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Login request mutation
  const mutation = useMutation({
    mutationFn: async ({ email, password }: loginState) => {
      const user = await ResidentService.loginResidentByEmailandPassword(
        email,
        password
      );
      // seperate state for resident login
      console.log(user);
    },
    onSuccess: () => handleLogin(),
    onError: (error: any) => setError(error.message),
  });

  const onSubmit = (values: loginState) => {
    setError(null);
    mutation.mutate(values);
  };

  const handleLogin = () => {
    navigate("/resident");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3">
          <h2 className="text-2xl font-semibold text-[#008FFB] mb-6 text-center">
            Resident Login
          </h2>

          {error && (
            <Alert message={error} type="error" showIcon className="mb-4" />
          )}

          {/* Login Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onSubmit}
            initialValues={{ email: "", password: "" }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                {
                  type: "email",
                  message: "Invalid email format",
                },
              ]}
            >
              <Input
                placeholder="Enter Your Email Address"
                size={"large"}
              ></Input>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input.Password
                placeholder="Enter Your Email Address"
                size={"large"}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Login
              </Button>
            </Form.Item>

            {/* <div className="mb-6">
              <button
                onClick={onSubmit}
                className="w-full px-6 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
              >
                Login
              </button>
            </div> */}
          </Form>

          <div className="flex justify-between">
            <div className="text-center">
              {/* <a href="#" ></a> */}
              <Link
                to="/admin/login"
                className="text-sm text-[#008FFB] hover:text-[#00C1A7]"
              >
                Don't remember password?
              </Link>
            </div>
            <div className="text-center">
              {/* <a href="#" ></a> */}
              <Link
                to="/admin/login"
                className="text-sm text-[#008FFB] hover:text-[#00C1A7]"
              >
                Need to activate account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentLoginPage;
