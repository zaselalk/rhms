import { FC } from "react";
import { useNavigate } from "react-router";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";

// Resident data
const residentData = {
  id: "01",
  name: "Ravindu Harshana",
  nic: "200000000V",
  age: 29,
  bloodGroup: "O+",
  division: "Katugahahena",
  contact: "0711287298",
  healthStats: {
    bloodPressure: "120/89 mm/mg",
    heartRate: "120 BPM",
    cholesterol: "85 mg/dl",
    glucose: "200 mg/dl",
  },
  patientHistory: [
    {
      clinicName: "ABC Clinic",
      date: "2024 Oct 2",
      location: "Colombo 07",
      doctor: "Dr. Anura",
      reportLink: "/reports/fever",
    },
    {
      clinicName: "XYZ Medical Center",
      date: "2024 Apr 2",
      location: "Kandy",
      doctor: "Dr. Sanjeewa",
      reportLink: "/reports/fever-apr",
    },
  ],
};

const ResidentProfilePage: FC = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/resident-profile-edit");
  };

  return (
    <DashboardContainer>
      <div className="p-6">
        {/* Align heading left and button right */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#008FFB]">
            Resident Profile
          </h2>
          <button
            className="text-[#008FFB] border border-[#008FFB] rounded-md px-4 py-2 hover:bg-[#00C1A7]"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
        </div>

        {/* Resident Overview */}
        <div className="items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 ml-5">
            {residentData.name}
          </h3>
          <p className="font-semibold text-gray-800 ml-5">
            ID: {residentData.id}
          </p>
        </div>

        {/* Profile Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row">
          <div className="ml-0 sm:ml-6 flex-grow">
            <div className="grid grid-cols-4 sm:grid-cols-4 gap-4">
              <p>
                <strong>NIC:</strong> {residentData.nic}
              </p>
              <p>
                <strong>Age:</strong> {residentData.age}
              </p>
              <p>
                <strong>Blood Group:</strong> {residentData.bloodGroup}
              </p>
              <p>
                <strong>Division:</strong> {residentData.division}
              </p>
              <p>
                <strong>Contact:</strong> {residentData.contact}
              </p>
            </div>
          </div>
        </div>

        {/* Health Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {[
            {
              title: "Blood Pressure",
              value: residentData.healthStats.bloodPressure,
              status: "Normal",
            },
            {
              title: "Heart Rate",
              value: residentData.healthStats.heartRate,
              status: "Normal",
            },
            {
              title: "Cholesterol",
              value: residentData.healthStats.cholesterol,
              status: "Normal",
            },
            {
              title: "Glucose",
              value: residentData.healthStats.glucose,
              status: "High",
            },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800">
                {stat.title}
              </h4>
              <p className="text-gray-600">{stat.value}</p>
              <p className="text-gray-600">{stat.status}</p>
            </div>
          ))}
        </div>

        {/* Patient History with Clinic Details */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-semibold text-[#008FFB] mb-4">
            Patient History
          </h3>
          <table className="w-full table-auto">
            <thead>
              <tr>
                {["Clinic Name", "Date of Visit", "Report"].map(
                  (header, index) => (
                    <th
                      key={index}
                      className="text-left px-4 py-2 text-sm text-gray-600"
                    >
                      {header}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {residentData.patientHistory.map((record, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {record.date}
                  </td>

                  <td className="px-4 py-2 text-sm text-gray-700">
                    {record.clinicName}
                  </td>

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
      </div>
    </DashboardContainer>
  );
};

export default ResidentProfilePage;
