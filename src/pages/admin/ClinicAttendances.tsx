import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";

// Dummy Patient Data
const patients = [
  { id: "DB001", name: "Nuwan Perera" },
  { id: "DB002", name: "Asela Bandara" },
  { id: "DB003", name: "Ravindu Jayasinghe" },
  { id: "DB004", name: "Dilukshi Fernando" },
  { id: "DB005", name: "Ashfa Nazeer" },
  { id: "DB006", name: "Sanduni Wickramasinghe" },
  { id: "DB007", name: "Tharindu Mendis" },
  { id: "DB008", name: "Sachini Herath" },
  { id: "DB009", name: "Isuru Gunaratne" },
  { id: "DB010", name: "Kavindi Rajapaksha" },
  { id: "DB011", name: "Lahiru Abeysekara" },
];

interface Attendance {
  patientId: string;
  status: boolean;
}

const ClinicAttendances: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sessionId = location.pathname.split("/")[2];

  const [searchTerm, setSearchTerm] = useState("");
  const [attendances, setAttendances] = useState<Attendance[]>(
    patients.map((patient) => ({
      patientId: patient.id,
      status: false,
    }))
  );

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAttendance = (patientId: string) => {
    setAttendances((prev) =>
      prev.map((a) =>
        a.patientId === patientId ? { ...a, status: !a.status } : a
      )
    );
  };

  const saveAttendance = () => {
    alert("Attendance saved!");
  };

  const previousAttendancePercentage = 60;
  const totalPatients = attendances.length;
  const presentCount = attendances.filter((a) => a.status).length;
  const attendancePercentage = (presentCount / totalPatients) * 100;
  const percentageDifference = attendancePercentage - previousAttendancePercentage;
  const isImproved = percentageDifference >= 0;

  return (
    <DashboardContainer>
      <div className="p-6 w-full min-h-screen bg-gray-50">
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            <FaArrowLeft />
            Back
          </button>
        </div>

        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Attendance for Session - <span className="text-blue-600">{sessionId}</span>
          </h1>
        </div>

        {/* Attendance Summary */}
        <div className="mb-8 p-6 bg-white rounded-xl shadow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-gray-500 font-medium">Total Patients</p>
            <p className="text-xl font-semibold">{totalPatients}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Present</p>
            <p className="text-xl font-semibold">{presentCount}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Attendance %</p>
            <p className="text-xl font-semibold">{attendancePercentage.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Change from Last Session</p>
            <p className={`text-xl font-semibold ${isImproved ? "text-green-600" : "text-red-600"}`}>
              {isImproved ? "+" : ""}
              {percentageDifference.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Patient"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Attendance Table */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Patient Attendance</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => {
                  const attendance = attendances.find((a) => a.patientId === patient.id);
                  const isPresent = attendance?.status;
                  return (
                    <tr key={patient.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{patient.id}</td>
                      <td className="p-3">{patient.name}</td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleAttendance(patient.id)}
                          className={`px-4 py-2 rounded-lg transition shadow ${
                            isPresent
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-red-500 hover:bg-red-600 text-white"
                          }`}
                        >
                          {isPresent ? "Present" : "Absent"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Save Attendance */}
        <div className="mt-6 text-right">
          <button
            onClick={saveAttendance}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Save Attendance
          </button>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default ClinicAttendances;
