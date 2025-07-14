import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import ResidentClinicService from "../../services/residentclinic.service";

interface Patient {
  resident: {
    nic: string;
    firstName: string;
  };
}

interface Attendance {
  patientId: string;
  status: boolean;
}

const ClinicAttendances: React.FC = () => {
  const { sessionID, clinicID } = useParams<{ sessionID: string; clinicID: string }>();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await ResidentClinicService.getResidentsByClinicId(clinicID!);
        setPatients(data);

        setAttendances(
          data.map((patient: Patient) => ({
            patientId: patient.resident.nic,
            status: false,
          }))
        );
      } catch (error) {
        console.error("Error fetching patients for clinic:", error);
      }
    };

    if (clinicID) {
      fetchPatients();
    }
  }, [clinicID]);

  const toggleAttendance = (patientId: string) => {
    setAttendances((prev) =>
      prev.map((a) =>
        a.patientId === patientId ? { ...a, status: !a.status } : a
      )
    );
  };

  const saveAttendance = () => {
    alert("Attendance saved!");
    // Add API call here if needed to save attendance data
  };

  const filteredPatients = patients.filter((patient) =>
    patient.resident.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPatients = attendances.length;
  const presentCount = attendances.filter((a) => a.status).length;
  const attendancePercentage = (presentCount / totalPatients) * 100 || 0;

  return (
    <DashboardContainer>
      <div className="p-6 w-full min-h-screen bg-gray-50">
        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Attendance for Session -{" "}
            <span className="text-blue-600">{sessionID}</span>
          </h1>
        </div>

        {/* Attendance Summary */}
        <div className="mb-8 p-6 bg-white rounded-xl shadow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
            <p className="text-xl font-semibold">
              {attendancePercentage.toFixed(1)}%
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
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            Patient Attendance
          </h2>
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
                  const attendance = attendances.find(
                    (a) => a.patientId === patient.resident.nic
                  );
                  const isPresent = attendance?.status;
                  return (
                    <tr key={patient.resident.nic} className="border-b hover:bg-gray-50">
                      <td className="p-3">{patient.resident.nic}</td>
                      <td className="p-3">{patient.resident.firstName}</td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleAttendance(patient.resident.nic)}
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
