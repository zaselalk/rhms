import React, { FC } from 'react';
import { useNavigate } from 'react-router';


const LoginPage: FC = () => {
  const navigate = useNavigate();

  //ref to store username and password
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(username, password)
    // Handle login logic here
    navigate('/admin/dashboard');
  }
  return (
    <div className="flex min-h-screen bg-gray-100">


      {/* Left Image Section */}
      <div className="hidden lg:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('path/to/your/image.jpg')" }}></div>

      {/* Right Login Form Section */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-center text-[#008FFB] mb-6">Hospital Management</h2>

          <form>
            {/* Username Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                ref={usernameRef}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                placeholder="Enter your username"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                ref={passwordRef}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                placeholder="Enter your password"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-between items-center mb-6">
              <a href="#" className="text-sm text-[#266874] hover:underline">Forgot Password?</a>
            </div>

            {/* Login Button */}
            <button

              className="w-full py-2 bg-[#008FFB] text-white font-semibold rounded-lg shadow-md hover:bg-[#006fbb] focus:ring-2 focus:ring-[#00C1A7] focus:ring-offset-2"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
