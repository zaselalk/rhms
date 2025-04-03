import { FC } from 'react';
import { useNavigate } from 'react-router';
import AdminSlidebar from '../../components/layouts/admin/AdminSlidebar';
import { AdminNavbar } from '../../components/layouts/admin/AdminNavbar';
import { DashboardContainer } from '../../components/layouts/overlays/DashboardContainer';

const ResidentProfilePage: FC = () => {
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate('/resident-profile-edit');
    };

    return (
        <DashboardContainer>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6 flex-col sm:flex-row">
                    <h2 className="text-2xl font-semibold text-[#008FFB]">Resident Profile</h2>
                    <button
                        className="mt-4 sm:mt-0 text-[#008FFB] border border-[#008FFB] rounded-md px-4 py-2 hover:bg-[#00C1A7]"
                        onClick={handleEditProfile}
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Profile Overview */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row">
                    <div className="flex-shrink-0 sm:w-1/3 flex justify-center sm:justify-start mb-4 sm:mb-0">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Profile"
                            className="rounded-full w-32 h-32"
                        />
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
                    {[
                        { title: "Blood Pressure", value: "120/89 mm/mg", status: "Normal" },
                        { title: "Heart Rate", value: "120 BPM", status: "Above The Norm" },
                        { title: "Cholesterol", value: "85 mg/dl", status: "Normal" },
                        { title: "Glucose", value: "200 mg/dl", status: "High" }
                    ].map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <h4 className="text-lg font-semibold text-gray-800">{stat.title}</h4>
                            <p className="text-gray-600">{stat.value}</p>
                            <p className="text-gray-600">{stat.status}</p>
                        </div>
                    ))}
                </div>

                {/* Patient History */}
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Patient History</h3>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                {["Date of Visit", "Diagnosis", "Total Clinic", "Report"].map((header, index) => (
                                    <th key={index} className="text-left px-4 py-2 text-sm text-gray-600">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { date: "2024 Oct 2", diagnosis: "Viral Fever", clinic: "4" },
                                { date: "2024 Oct 2", diagnosis: "Viral Fever", clinic: "4" },
                                { date: "2024 Apr 2", diagnosis: "Viral Fever", clinic: "4" }
                            ].map((record, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 text-sm text-gray-700">{record.date}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{record.diagnosis}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{record.clinic}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        <button className="text-[#008FFB] hover:text-[#00C1A7]">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </DashboardContainer>
    );
};

export default ResidentProfilePage;
