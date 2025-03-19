import { FC } from 'react';
import { Link } from 'react-router';
import AdminSlidebar from '../components/layouts/admin/AdminSlidebar';

const UsersPage: FC = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Reusable Sidebar */}
            <AdminSlidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-[#008FFB]">User Details</h2>
                    <Link to={"/admin/users/add"} className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]">+ Add User</Link>
                </div>

                {/* User Stats */}
                <div className="flex mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-md mr-4 flex-1 text-center">
                        <p className="text-lg font-semibold text-gray-800">8</p>
                        <p className="text-sm text-gray-600">Doctors</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md mr-4 flex-1 text-center">
                        <p className="text-lg font-semibold text-gray-800">8</p>
                        <p className="text-sm text-gray-600">Nurse</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md flex-1 text-center">
                        <p className="text-lg font-semibold text-gray-800">8</p>
                        <p className="text-sm text-gray-600">Staff</p>
                    </div>
                </div>

                {/* Users List */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">ID</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Name</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Permissions</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#STF001</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Dr. Ravindu Harshana</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Dashboard, Diseases, HouseHold</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <button className="text-[#008FFB] hover:text-[#00C1A7]">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="ml-4 text-red-500 hover:text-red-700">
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#STF001</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Dr. Ravindu Harshana</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Dashboard</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <button className="text-[#008FFB] hover:text-[#00C1A7]">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="ml-4 text-red-500 hover:text-red-700">
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UsersPage;
