import React, { FC } from 'react';

const CreateResidentPage: FC = () => {
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
                    <h2 className="text-2xl font-semibold text-[#008FFB]">Create Resident</h2>
                </div>

                {/* Create Resident Form */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-end">
                        <button className="text-red-500 text-xl">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    {/* Profile Picture */}
                    <div className="mb-4 text-center">
                        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                            <span className="text-gray-400">+</span>
                        </div>
                        <input type="file" className="mt-2" />
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                                placeholder="First Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                                placeholder="Last Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Birthday</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                                placeholder="Contact"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address 1</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                                placeholder="Address 1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address 2</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                                placeholder="Address 2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Division</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                                placeholder="Division"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Allergies</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                                placeholder="Allergies"
                            />
                        </div>
                    </div>

                    {/* Diseases and Clinics */}
                    <div className="mb-4">
                        <p className="font-medium text-gray-700">Diseases</p>
                        <div className="flex flex-wrap">
                            {['diabetes', 'acne', 'asthma'].map((disease) => (
                                <div key={disease} className="mr-4 mb-2">
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="ml-2 capitalize text-sm text-gray-700">{disease}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="font-medium text-gray-700">Clinics</p>
                        <div className="flex flex-wrap">
                            {['diabetes', 'acne', 'asthma'].map((clinic) => (
                                <div key={clinic} className="mr-4 mb-2">
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="ml-2 capitalize text-sm text-gray-700">{clinic}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            className="px-6 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateResidentPage;
