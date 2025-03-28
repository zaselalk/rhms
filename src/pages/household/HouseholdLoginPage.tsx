import { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import AdminSlidebar from '../../components/layouts/admin/AdminSlidebar';

const HouseholdLoginPage: FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Handle login logic here
        navigate('/household');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            {/* Navbar */}
            <div className="bg-[#008FFB] p-4 flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white">Hospital Management</h2>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3">
                    <h2 className="text-2xl font-semibold text-[#008FFB] text-center mb-6">Household Login</h2>

                    {/* Form */}
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

                    {/* Error / Success Message */}
                    {message && (
                        <div className="text-sm text-gray-700 mt-4">
                            {message}
                        </div>
                    )}

                    {/* Login Button */}
                    <div className="mt-6">
                        <button
                            onClick={handleLogin}
                            className="w-full px-6 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
                        >
                            Login
                        </button>
                    </div>

                    {/* Back to Login */}
                    <div className="text-center mt-4">
                        <a href="/forgot-password" className="text-sm text-[#008FFB] hover:text-[#00C1A7]">Forgot password?</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HouseholdLoginPage;
