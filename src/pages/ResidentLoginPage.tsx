import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router';

const ResidentLoginPage: FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Handle login logic here
        // redirect to  /resident-profile
        navigate('/resident-profile');

        console.log('Logged in with:', { username, password });
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-full sm:w-1/4 bg-white shadow-lg flex items-center justify-center">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-[#008FFB] text-center">Hospital Management</h2>
                </div>
            </div>

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
                        <a href="#" className="text-sm text-[#008FFB] hover:text-[#00C1A7]">Forgot password?</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResidentLoginPage;
