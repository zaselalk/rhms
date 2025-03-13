import React, { FC } from 'react';

const SingleDiseasePage: FC = () => {
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
                    <h2 className="text-2xl font-semibold text-[#008FFB]">Diabetes</h2>
                    <div className="px-4 py-2 bg-[#008FFB] text-white rounded-lg">145 Total</div>
                </div>

                {/* Top Divisions Table */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Top Divisions</h3>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Number</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Divisions</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Katugahahena</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#2</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Kamburupitiya</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Katugahahena</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Katugahahena</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Katugahahena</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Katugahahena</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Katugahahena</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Katugahahena</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Katugahahena</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Katugahahena</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SingleDiseasePage;
