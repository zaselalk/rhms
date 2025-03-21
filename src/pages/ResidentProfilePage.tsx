import { FC } from 'react';
import { useNavigate } from 'react-router';
import AdminSlidebar from '../components/layouts/admin/AdminSlidebar';

const ResidentProfilePage: FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Handle logout logic here
        navigate('/resident-login');
    }
    const handleEditProfile = () => {
        // Handle edit profile logic here
        navigate('/resident-profile-edit');
    }
    return (
        <div className=" flex bg-gray-100">
            {/* Reusable Sidebar */}
            <AdminSlidebar />

            {/* Navbar */}

            <div className=''>

                <div className="bg-[#008FFB] p-4 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-white">Hospital Management</h2>
                    <div className="flex items-center">
                        <span className="text-sm text-white mr-4">Ravindu (Admin)</span>
                        <button className="text-white border border-white rounded-md px-4 py-2 hover:bg-[#006fbb]" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6">

                    <div className="flex justify-between items-center mb-6 flex-col sm:flex-row">
                        <h2 className="text-2xl font-semibold text-[#008FFB]">Resident Profile</h2>
                        <button className="mt-4 sm:mt-0 text-[#008FFB] border border-[#008FFB] rounded-md px-4 py-2 hover:bg-[#00C1A7]" onClick={handleEditProfile}>
                            Edit Profile
                        </button>
                    </div>

                    {/* Profile Overview */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row">
                        <div className="flex-shrink-0 sm:w-1/3 flex justify-center sm:justify-start mb-4 sm:mb-0">
                            <img src="https://via.placeholder.com/150" alt="Profile" className="rounded-full w-32 h-32" />
                        </div>
                        <div className="ml-0 sm:ml-6 flex-grow">
                            <h3 className="text-xl font-semibold text-gray-800">Mr. Ravindu Harshana</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 mt-4">
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
        </div>
    );
};

export default ResidentProfilePage;
