import { Typography } from "antd";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../hooks/state/hooks";
import { LoginLeftImageSection } from "../components/features/user-management/user-authentication/LoginLeftImageSection";
import { LoginRightLoginSection } from "../components/features/user-management/user-authentication/LoginRightLoginSection";

const { Title } = Typography;

const LoginPage: FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [auth.isAuthenticated]);

  const handleSuccessLogin = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <Title level={2} className="text-center text-blue-800 pt-12">
        Resident Health Monitoring System - Katugahahena Hospital
      </Title>
      <div className="flex justify-center items-center min-h-full gap-32 p-12">
        {/* Left Image Section */}
        <LoginLeftImageSection />

        {/* Right Login Form Section */}
        <LoginRightLoginSection handleSuccessLogin={handleSuccessLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
