import React, { FC } from 'react';

const DivisionPage: FC = () => {
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
                            <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Residents</a></li>
                            <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Clinic</a></li>
                            <li><a href="#" className="block py-2 text-sm text-[#008FFB]">Division</a></li>
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
                    <h2 className="text-2xl font-semibold text-[#008FFB]">Division Details</h2>
                    <button className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]">New</button>
                </div>

                {/* Division Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Card 1 */}
                    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold text-gray-800">Katugahahena</p>
                            <p className="text-sm text-gray-600">236</p>
                        </div>
                        <button className="text-red-500">
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold text-gray-800">Kotagedara</p>
                            <p className="text-sm text-gray-600">100</p>
                        </div>
                        <button className="text-red-500">
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>

                    {/* Repeat for other cards */}
                    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold text-gray-800">Katugahahena</p>
                            <p className="text-sm text-gray-600">236</p>
                        </div>
                        <button className="text-red-500">
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold text-gray-800">Kotagedara</p>
                            <p className="text-sm text-gray-600">100</p>
                        </div>
                        <button className="text-red-500">
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold text-gray-800">Katugahahena</p>
                            <p className="text-sm text-gray-600">236</p>
                        </div>
                        <button className="text-red-500">
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold text-gray-800">Kotagedara</p>
                            <p className="text-sm text-gray-600">100</p>
                        </div>
                        <button className="text-red-500">
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                        <div>
                            <p className="text-lg font-semibold text-gray-800">Katugahahena</p>
                            <p className="text-sm text-gray-600">236</p>
                        </div>
                        <button className="text-red-500">
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DivisionPage;
