import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router"; // Import useNavigate and useLocation
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer"; // Import DashboardContainer

// Dummy Data for Clinic Patients
const patients = [
  { id: "DB001", name: "Ashfa" },
  { id: "DB002", name: "Asela" },
  { id: "DB003", name: "Ravindu" },
  { id: "DB004", name: "Dilukshi" },
  { id: "DB005", name: "Nihal" },
  { id: "DB006", name: "Sanath" },
  // Add more patients as necessary
];

interface Attendance {
  patientId: string;
  status: boolean; // true for present, false for absent
}

const ClinicAttendances: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sessionId = location.pathname.split("/")[2]; // Extract event ID from the URL

  const [searchTerm, setSearchTerm] = useState("");
  const [attendances, setAttendances] = useState<Attendance[]>(patients.map((patient) => ({
    patientId: patient.id,
    status: false, // Default status is absent
  })));

  // Filter patients based on search term
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle status change (mark as present or absent)
  const toggleAttendance = (patientId: string) => {
    setAttendances((prevAttendances) =>
      prevAttendances.map((attendance) =>
        attendance.patientId === patientId
          ? { ...attendance, status: !attendance.status }
          : attendance
      )
    );
  };

  // Handle save attendance
  const saveAttendance = () => {
    // Logic to save attendance (e.g., send to server)
    alert("Attendance saved!");
  };

  return (
    <DashboardContainer>
      <div className="p-6 w-full min-h-screen">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/clinic-details")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            <FaArrowLeft className="mr-2" />
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4">Attendance for Session - {sessionId}</h2>

        {/* Search Bar */}
        <div className="mb-4">
          
          <input
            type="text"
            placeholder="Search Patient"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 w-full rounded-lg">
            {/* <FaSearch className="absolute right-4 top-2 text-gray-500" /> */}
            </input>
        
        </div>

        {/* Patients Table */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Patient Attendance</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b">
                  <td className="p-2">{patient.id}</td>
                  <td className="p-2">{patient.name}</td>
                  <td className="p-2">
                    <button
                      onClick={() => toggleAttendance(patient.id)}
                      className={`px-4 py-2 rounded-lg shadow transition ${attendances.find((a) => a.patientId === patient.id)?.status
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                    >
                      {attendances.find((a) => a.patientId === patient.id)?.status
                        ? "Present"
                        : "Absent"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Save Attendance */}
        <div className="mt-6">
          <button
            onClick={saveAttendance}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Save Attendance
          </button>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default ClinicAttendances;
