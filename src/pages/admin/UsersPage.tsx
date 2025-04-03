import { FC } from 'react';
import { Link } from 'react-router';
import AdminSlidebar from '../../components/layouts/admin/AdminSlidebar';
import { FiUsers, FiShield } from "react-icons/fi";

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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex items-center space-x-4">
                        <div className="bg-[#008FFB]/10 text-[#008FFB] p-3 rounded-full text-2xl">
                            <FiUsers />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-gray-800">15</p>
                            <p className="text-sm text-gray-500">Users</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex items-center space-x-4">
                        <div className="bg-[#00C1A7]/10 text-[#00C1A7] p-3 rounded-full text-2xl">
                            <FiShield />
                        </div>
                        <div>
                            <p className="text-xl font-bold text-gray-800">10</p>
                            <p className="text-sm text-gray-500">Roles</p>
                        </div>
                    </div>
                </div>

                {/* Users List */}
                <div className="grid grid-cols-12 gap-4 mb-6">
                    <div className='col-span-8'>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr>
                                        <th className="text-left px-4 py-2 text-sm text-gray-600">Name</th>
                                        <th className="text-left px-4 py-2 text-sm text-gray-600">Role</th>
                                        <th className="text-left px-4 py-2 text-sm text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: "Asela Priyadarshana", role: "Surgeon" },
                                        { name: "Nimasha Jayasinghe", role: "Pediatrician" },
                                        { name: "Ravindu Madushanka", role: "Radiologist" },
                                        { name: "Dilukshi Perera", role: "Lab Technician" },
                                        { name: "Tharindu Silva", role: "Pharmacist" },
                                        { name: "Sanduni Weerasinghe", role: "Matron" },
                                        { name: "Chamika Fernando", role: "Medical Officer" },
                                        { name: "Isuru Rathnayake", role: "Emergency Responder" },
                                        { name: "Shanali Gunasekara", role: "Physiotherapist" },
                                        { name: "Malith Gamage", role: "Biomedical Engineer" },
                                        { name: "Hiruni Ranasinghe", role: "Receptionist" },
                                        { name: "Pasindu Jayalath", role: "Ward Attendant" },
                                        { name: "Gayani Dissanayake", role: "Infection Control Nurse" },
                                        { name: "Niroshan De Alwis", role: "Anesthesiologist" },
                                        { name: "Kavindya Senanayake", role: "Nutritionist" }
                                    ].map((person, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 text-sm text-gray-700">{person.name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700">{person.role}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700">
                                                <button className="text-[#008FFB] hover:text-[#00C1A7]">
                                                    <i className="fas fa-edit">Edit</i>
                                                </button>
                                                <button className="ml-4 text-red-500 hover:text-red-700">
                                                    <i className="fas fa-trash-alt">Delete</i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='col-span-4'>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr>
                                        <th className="text-left px-4 py-2 text-sm text-gray-600">Role</th>
                                        <th className="text-left px-4 py-2 text-sm text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        "Doctor",
                                        "Nurse",
                                        "Surgeon",
                                        "Pediatrician",
                                        "Radiologist",
                                        "Lab Technician",
                                        "Pharmacist",
                                        "Matron",
                                        "Medical Officer",
                                        "Emergency Responder",
                                        "Physiotherapist",
                                        "Biomedical Engineer",
                                        "Receptionist",
                                        "Ward Attendant",
                                        "Infection Control Nurse",
                                        "Anesthesiologist",
                                        "Nutritionist"
                                    ].map((role, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 text-sm text-gray-700">{role}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700">
                                                <button className="text-[#008FFB] hover:text-[#00C1A7]">
                                                    <i className="fas fa-edit">Edit</i>
                                                </button>
                                                <button className="ml-4 text-red-500 hover:text-red-700">
                                                    <i className="fas fa-trash-alt">Delete</i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                {/* Role List */}

            </div>
        </div>
    );
};

export default UsersPage;
