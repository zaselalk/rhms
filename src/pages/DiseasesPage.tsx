import React from 'react';
import React, { FC } from 'react';
import { Link } from 'react-router';
import AdminSidebar from "../../Components/Layouts/Admin/AdminSidebar";

const DiseasesPage: FC = () => {
    return (
         <div className="min-h-screen bg-gray-100 flex">
                {/* Reusable Sidebar */}
                <AdminSidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-[#008FFB]">Diseases</h2>
                    <button className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]">+ Add New</button>
                </div>

                {/* Diseases List */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Disease Name</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Patients</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">Diabetics</td>
                                <td className="px-4 py-2 text-sm text-gray-700">261</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <Link to={"single"} className="text-[#008FFB] hover:text-[#00C1A7]">View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">Sugar</td>
                                <td className="px-4 py-2 text-sm text-gray-700">261</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <Link to={"single"} className="text-[#008FFB] hover:text-[#00C1A7]">View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">Low Pressure</td>
                                <td className="px-4 py-2 text-sm text-gray-700">261</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <Link to={"single"} className="text-[#008FFB] hover:text-[#00C1A7]">View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">High Pressure</td>
                                <td className="px-4 py-2 text-sm text-gray-700">261</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <Link to={"single"} className="text-[#008FFB] hover:text-[#00C1A7]">View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">Depression</td>
                                <td className="px-4 py-2 text-sm text-gray-700">261</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <Link to={"single"} className="text-[#008FFB] hover:text-[#00C1A7]">View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">Osteoporosis</td>
                                <td className="px-4 py-2 text-sm text-gray-700">261</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <Link to={"single"} className="text-[#008FFB] hover:text-[#00C1A7]">View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">Acne</td>
                                <td className="px-4 py-2 text-sm text-gray-700">261</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <Link to={"single"} className="text-[#008FFB] hover:text-[#00C1A7]">View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">Asthma</td>
                                <td className="px-4 py-2 text-sm text-gray-700">261</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <Link to={"single"} className="text-[#008FFB] hover:text-[#00C1A7]">View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">Arrhythmia</td>
                                <td className="px-4 py-2 text-sm text-gray-700">261</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <Link to={"single"} className="text-[#008FFB] hover:text-[#00C1A7]">View</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DiseasesPage;
