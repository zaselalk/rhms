import { FC, useState } from "react";
import { Link } from "react-router";

const ForgottenPasswordPage: FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = () => {
    // Handle password reset logic here
    if (email) {
      setMessage("Password reset instructions have been sent to your email.");
    } else {
      setMessage("Please enter a valid email address.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <div className="bg-[#008FFB] p-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">
          Hospital Management
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3">
          <h2 className="text-2xl font-semibold text-[#008FFB] text-center mb-6">
            Forgot Password
          </h2>

          {/* Form */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
              placeholder="Enter your registered email"
            />
          </div>

          {/* Error / Success Message */}
          {message && (
            <div className="text-sm text-gray-700 mt-4">{message}</div>
          )}

          {/* Reset Button */}
          <div className="mt-6">
            <button
              onClick={handleResetPassword}
              className="w-full px-6 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
            >
              Send Reset Instructions
            </button>
          </div>

          {/* Back to Login */}
          <div className="text-center mt-4">
            {/* <a href= className="text-sm text-[#008FFB] hover:text-[#00C1A7]">Back to Login</a> */}
            <Link to={"/resident-login"}>Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgottenPasswordPage;
