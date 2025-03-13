import React, { FC } from 'react';

const ResidentProfilePage: FC = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-white shadow-lg">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-[#008FFB]">Hospital Management</h2>
                    <nav className="mt-8">
                        <ul>
                            <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Dashboard</a></li>
                            <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Diseases</a></li>
                            <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Households</a></li>
                            <li><a href="#" className="block py-2 text-sm text-[#008FFB]">Residents</a></li>
                            <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Clinic</a></li>
                            <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Division</a></li>
                            <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Users</a></li>
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
                    <h2 className="text-2xl font-semibold text-[#008FFB]">Resident Profile</h2>
                    <button className="text-[#008FFB] border border-[#008FFB] rounded-md px-4 py-2 hover:bg-[#00C1A7]">
                        Edit Profile
                    </button>
                </div>

                {/* Profile Overview */}
                <div className="bg-white p-6 rounded-lg shadow-md flex">
                    <div className="flex-shrink-0">
                        <img src="https://via.placeholder.com/150" alt="Profile" className="rounded-full w-32 h-32" />
                    </div>
                    <div className="ml-6 flex-grow">
                        <h3 className="text-xl font-semibold text-gray-800">Mr. Ravindu Harshana</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mt-4">
                            <div>
                                <p><strong>Age:</strong> 29</p>
                                <p><strong>Blood Group:</strong> O+</p>
                            </div>
                            <div>
                                <p><strong>Division:</strong> Katugahahena</p>
                                <p><strong>Contact:</strong> 0711287298</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Health Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="text-lg font-semibold text-gray-800">Blood Pressure</h4>
                        <p className="text-gray-600">120/89 mm/mg</p>
                        <p className="text-gray-600">Normal</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="text-lg font-semibold text-gray-800">Heart Rate</h4>
                        <p className="text-gray-600">120 BPM</p>
                        <p className="text-gray-600">Above The Norm</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="text-lg font-semibold text-gray-800">Cholesterol</h4>
                        <p className="text-gray-600">85 mg/dl</p>
                        <p className="text-gray-600">Normal</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="text-lg font-semibold text-gray-800">Glucose</h4>
                        <p className="text-gray-600">200 mg/dl</p>
                        <p className="text-gray-600">High</p>
                    </div>
                </div>

                {/* Patient History */}
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Patient History</h3>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Date of Visit</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Diagnosis</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Total Clinic</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Report</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">2024 Oct 2</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Viral Fever</td>
                                <td className="px-4 py-2 text-sm text-gray-700">4</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <button className="text-[#008FFB] hover:text-[#00C1A7]">View</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">2024 Oct 2</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Viral Fever</td>
                                <td className="px-4 py-2 text-sm text-gray-700">4</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <button className="text-[#008FFB] hover:text-[#00C1A7]">View</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">2024 Apr 2</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Viral Fever</td>
                                <td className="px-4 py-2 text-sm text-gray-700">4</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <button className="text-[#008FFB] hover:text-[#00C1A7]">View</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ResidentProfilePage;
