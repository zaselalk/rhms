import { FC, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { loginState } from "../../types/login";
import { Alert, Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { ArrowBigLeft } from "lucide-react";
import { useResidentAuth } from "../../components/auth/ResidentAuthContext";

const ResidentLoginPage: FC = () => {
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const { login, isLoading } = useResidentAuth();

  // Get the intended destination from location state
  const from = location.state?.from || "/resident";

  const onSubmit = async (values: loginState) => {
    try {
      setError(null);
      await login(values.email, values.password);
      // Navigate to intended destination after successful login
      navigate(from, { replace: true });
    } catch (error: any) {
      setError(error.message);
    }
  };


            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3">
                    <h2 className="text-2xl font-semibold text-[#008FFB] mb-6 text-center">Resident Login</h2>

                    {/* Login Form */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="mb-6">
                        <button
                            onClick={handleLogin}
                            className="w-full px-6 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
                        >
                            Login
                        </button>
                    </div>

                    <div className="text-center">
                        {/* <a href="#" ></a> */}
                        <Link to="/admin/login" className="text-sm text-[#008FFB] hover:text-[#00C1A7]">Admin Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResidentLoginPage;
