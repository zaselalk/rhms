import React, { FC } from 'react';

const UsersPage: FC = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-white shadow-lg">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-[#008FFB]">Hospital Management</h2>
                    <nav className="mt-8">
                        <ul>
                            <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Dashboard</a></li>
                            <li><a href="#" className="block py-2 text-sm text-[#008FFB]">Diseases</a></li>
                            <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Households</a></li>
                            <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Residents</a></li>
                            <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Clinic</a></li>
                            <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Division</a></li>
                            <li><a href="#" className="block py-2 text-sm text-[#008FFB]">Users</a></li>
                        </ul>
                    </nav>
                    <div className="mt-8 flex items-center">
                        <div className="text-sm text-gray-700">Ravindu</div>
                        <div className="text-xs text-gray-500 ml-2">Admin</div>
                    </div>
                    <div className="mt-2">
                        <button className="w-full py-2 text-white bg-[#008FFB] rounded-md hover:bg-[#006fbb]">Logout</button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-[#008FFB]">User Details</h2>
                    <button className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]">+ Add User</button>
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
