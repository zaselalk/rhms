import { useMutation } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import AuthServices from "../services/auth.service";
import { loginState } from "../types/login";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from "antd";
import { Link } from "react-router";

import { useAppDispatch, useAppSelector } from "../hooks/state/hooks";
import { login } from "../store/slices/authSlices";

const LoginPage: FC = () => {
  const Auth = new AuthServices();
  const auth = useAppSelector((state) => state.auth);

  // // Check if user is already authenticated
  // if (auth.isAuthenticated) {
  //   return <Navigate to="/admin/dashboard" />;
  // }
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [auth.isAuthenticated]);

  const dispatch = useAppDispatch();

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
      formik.setStatus(error.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      formik.setStatus(null); // clear previous errors
      mutation.mutate(values);
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h2 className="text-center text-2xl pt-12 text-blue-800">
        Resident Health Monitoring System - Katugahahena Hospital
      </h2>
      <div className="flex justify-center items-center min-h-full  gap-32 p-12">
        {/* Left Image Section */}
        <div className="w-1/2 bg-cover bg-center">
          <img src="/images/login_cover.svg" width={600} />
        </div>

        {/* Right Login Form Section */}
        <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-bold text-center text-[#008FFB] mb-6">
              Staff Login
            </h2>

            {formik.status && (
              <Alert message={formik.status} type="error" showIcon />
            )}

            <form onSubmit={formik.handleSubmit}>
              {/* Email Input */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  className={`w-full px-4 py-2 mt-1 border ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none`}
                  placeholder="Enter your email address"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  className={`w-full px-4 py-2 mt-1 border ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none`}
                  placeholder="Enter your password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-2 bg-[#008FFB] text-white font-semibold rounded-lg shadow-md hover:bg-[#006fbb] focus:ring-2 focus:ring-[#00C1A7] focus:ring-offset-2 disabled:opacity-50 cursor-pointer transition duration-200"
                disabled={mutation.isPending || !formik.isValid}
              >
                {mutation.isPending ? "Loading..." : "Login"}
              </button>
              <Link
                to="/resident/login"
                className="text-sm text-blue-600 hover:underline mt-4 block text-center"
              >
                Resident Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
