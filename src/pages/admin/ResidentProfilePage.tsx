import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { DashboardContainer } from '../../components/layouts/overlays/DashboardContainer';
import residentService from '../../services/resident.service';
import householdresidentService from '../../services/householdresident.service';




const calculateAge = (birthday: string): number => {
    const birthDate = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};


const ResidentProfilePage: FC = () => {
    const [fresidentData, setResidentData] = useState<any>();

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate('/editprofile/' + id);
    };


    const [householdMembers, setHouseholdMembers] = useState<any[]>([]);

    const fetchHouseholdMembers = async (residentId: string) => {
        try {
            const res = await householdresidentService.gethouseholdResidentsByResidentId(residentId);
            setHouseholdMembers(res.data);
        } catch (error) {
            console.error("Error fetching household members:", error);
        }
    };


    const fetchResidentData = async () => {
        if (!id) {
            console.error("Resident ID is undefined\n");
            return;
        }

        try {
            const response = await residentService.getSingleResident(id);
            console.log(response.data);
            setResidentData(response.data);
            // Update state with fetched data if needed
            console.log(fresidentData)

        } catch (error) {
            console.error("Error fetching resident data:", error);
        }
    }



    useEffect(() => {
        fetchResidentData();
        if (id) {
            fetchHouseholdMembers(id);
        }

    }, [id]);

    // ✅ useEffect to watch for state change
    useEffect(() => {
        if (fresidentData) {
            console.log("Updated fresidentData:", fresidentData);
        }
    }, [fresidentData]);




    return (
        <DashboardContainer>
            <div className="p-6">
                {!fresidentData ? (
                    <p className="text-center text-gray-600">Loading resident data...</p>
                ) : (
                    <>
                        {/* Heading */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-[#008FFB]">Resident Profile</h2>

                            <div className='flex space-x-4'>

                                <Link to="edit">
                                    <button
                                        className="text-[#008FFB] border border-[#008FFB] rounded-md px-4 py-2"
                                        onClick={handleEditProfile}
                                    >
                                        Edit Profile
                                    </button>
                                </Link>
                                <Link to="edit">
                                    <button
                                        className="text-[#fb0000] border border-[#fb0000] rounded-md px-4 py-2 hover:bg-[#c10000]"

                                    >
                                        Delete Profile
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Resident Overview */}
                        <div className="items-center mb-6">
                            <h3 className="text-2xl font-semibold text-gray-800 ml-5">
                                {fresidentData.firstName} {fresidentData.lastName}
                            </h3>
                            <p className="font-semibold text-gray-800 ml-5">ID: {fresidentData.id}</p>
                        </div>

                        {/* Profile Overview */}
                        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row">
                            <div className="ml-0 sm:ml-6 flex-grow">
                                <div className="grid grid-cols-4 gap-4">
                                    <p><strong>NIC:</strong> {fresidentData.nic}</p>
                                    <p><strong>Age:</strong> {fresidentData.birthday ? calculateAge(fresidentData.birthday) : "N/A"}</p>
                                    <p><strong>Blood Group:</strong> {fresidentData.bloodGroup}</p>
                                    <p><strong>Division:</strong> {fresidentData.divisionId}</p>
                                    <p><strong>Contact:</strong> {fresidentData.contactNumber}</p>
                                    <p><strong>MaritalState:</strong> {fresidentData.maritalState}</p>
                                </div>
                            </div>
                        </div>

                        {/* Health Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold text-gray-800">Blood Pressure</h4>
                                <p className="text-gray-600">{fresidentData.bloodPressure || "N/A"}</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold text-gray-800">Heart Rate</h4>
                                <p className="text-gray-600">{fresidentData.heartRate || "N/A"} BPM</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold text-gray-800">Height</h4>
                                <p className="text-gray-600">{fresidentData.height} cm</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold text-gray-800">Weight</h4>
                                <p className="text-gray-600">{fresidentData.weight} kg</p>
                            </div>
                        </div>

                        {/* Household Members Table */}
                        {householdMembers.length > 0 && (
                            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Household Members</h3>
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr>
                                            <th className="text-left px-4 py-2 text-sm text-gray-600">ID</th>
                                            <th className="text-left px-4 py-2 text-sm text-gray-600">Name</th>
                                            <th className="text-left px-4 py-2 text-sm text-gray-600">Age</th>
                                            <th className="text-left px-4 py-2 text-sm text-gray-600">Relation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {householdMembers.map((member, index) => (
                                            <tr key={index} className="hover:bg-gray-100">
                                                <td className="px-4 py-2 text-sm text-gray-700">{member.resident.id}</td>
                                                <td className="px-4 py-2 text-sm text-gray-700">
                                                    {member.resident.firstName} {member.resident.lastName}
                                                </td>
                                                <td className="px-4 py-2 text-sm text-gray-700">{new Date().getFullYear() - new Date(member.resident.birthday).getFullYear()} years</td>
                                                <td className="px-4 py-2 text-sm text-gray-700">{member.relation}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}


                        {/* Patient History */}
                        {fresidentData.patientHistory && fresidentData.patientHistory.length > 0 && (
                            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Patient History</h3>
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr>
                                            <th className="text-left px-4 py-2 text-sm text-gray-600">Clinic Name</th>
                                            <th className="text-left px-4 py-2 text-sm text-gray-600">Date</th>
                                            <th className="text-left px-4 py-2 text-sm text-gray-600">Report</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fresidentData.patientHistory.map((record: any, index: number) => (
                                            <tr key={index} className="hover:bg-gray-100">
                                                <td className="px-4 py-2 text-sm text-gray-700">{record.clinicName}</td>
                                                <td className="px-4 py-2 text-sm text-gray-700">{record.date}</td>
                                                <td className="px-4 py-2 text-sm text-gray-700">
                                                    <button
                                                        onClick={() => navigate(record.reportLink)}
                                                        className="text-[#008FFB] hover:text-[#00C1A7]"
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            </div>
        </DashboardContainer>

    );

};

export default ResidentProfilePage;
