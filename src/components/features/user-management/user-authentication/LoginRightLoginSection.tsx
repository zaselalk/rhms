import { useMutation } from "@tanstack/react-query";
import { Typography, Alert, Form } from "antd";
import { FC, useState } from "react";
import { loginState } from "../../../../types/login";
import { useAppDispatch } from "../../../../hooks/state/hooks";
import AuthServices from "../../../../services/auth.service";
import { login } from "../../../../store/slices/authSlices";
import { UserLoginForm } from "./UserLoginForm";

const { Title } = Typography;

interface UserLoginSectionProps {
  handleSuccessLogin: () => void;
}

export const LoginRightLoginSection: FC<UserLoginSectionProps> = ({
  handleSuccessLogin,
}) => {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const Auth = new AuthServices();

  const onFinish = (values: loginState) => {
    setError(null); // clear previous errors
    mutation.mutate(values);
  };

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
      handleSuccessLogin();
    },
    onError: (error: any) => {
      setError(error.message);
    },
  });

  return (
    <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <Title level={3} className="text-center text-[#008FFB] mb-6">
          Staff Login
        </Title>

        {error && (
          <Alert message={error} type="error" showIcon className="mb-4" />
        )}

        <UserLoginForm form={form} onFinish={onFinish} />
      </div>
    </div>
  );
};
