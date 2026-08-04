import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import ResidentClinicService from "../../services/residentclinic.service";
import { Search, Users, UserCheck, Percent, ClipboardList } from "lucide-react";

interface Patient {
  resident: {
    nic: string;
    id: string;
    contactNumber: string;
    firstName: string;
  };
}

interface Attendance {
  patientId: string;
  attendance: boolean; // renamed from status to attendance
}

const ClinicAttendances: React.FC = () => {
  const { sessionID, clinicID } = useParams<{
    sessionID: string;
    clinicID: string;
  }>();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const data = await ResidentClinicService.getResidentsByClinicId(
          clinicID!
        );
        setPatients(data);

        setAttendances(
          data.map((patient: Patient) => ({
            patientId: patient.resident.id,
            attendance: false, // initialize as false
          }))
        );
      } catch (error) {
        console.error("Error fetching patients for clinic:", error);
      } finally {
        setLoading(false);
      }
    };

    if (clinicID) {
      fetchPatients();
    }
  }, [clinicID]);

  const toggleAttendance = (patientId: string) => {
    setAttendances((prev) =>
      prev.map((a) =>
        a.patientId === patientId ? { ...a, attendance: !a.attendance } : a
      )
    );
  };

  const saveAttendance = async () => {
    try {
      setLoading(true);
      await ResidentClinicService.saveClinicAttendance(
        clinicID!,
        sessionID!,
        attendances
      );
      alert("Attendance saved!");
    } catch (error) {
      alert("Failed to save attendance.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // load attendances for the session
  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        setLoading(true);
        const data = await ResidentClinicService.getClinicAttendances(
          clinicID!,
          sessionID!
        );
        setAttendances(data);
      } catch (error) {
        console.error("Error fetching attendances:", error);
      } finally {
        setLoading(false);
      }
    };

    if (clinicID && sessionID) {
      fetchAttendances();
    }
  }, [clinicID, sessionID]);

  const filteredPatients = patients.filter((patient) =>
    patient.resident.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPatients = attendances.length;
  const presentCount = attendances.filter((a) => a.attendance).length;
  const attendancePercentage = (presentCount / totalPatients) * 100 || 0;

  return (
    <DashboardContainer>
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#008FFB] to-[#00C1A7] px-8 py-8 shadow-lg mb-6">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -right-4 bottom-0 h-24 w-24 rounded-full bg-white/10" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
              <ClipboardList size={22} />
            </div>
            <div>
              <p className="text-white/80 text-sm font-medium tracking-wide uppercase">
                Attendance
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Session {sessionID}
              </h2>
            </div>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Patients</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{totalPatients}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#008FFB]/10 text-[#008FFB]">
              <Users size={22} />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm text-gray-500 font-medium">Present</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{presentCount}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
              <UserCheck size={22} />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm text-gray-500 font-medium">Attendance %</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">
                {attendancePercentage.toFixed(1)}%
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
              <Percent size={22} />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patient by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#008FFB]/30 focus:border-[#008FFB] outline-none transition-all"
            />
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500">NIC</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500">Name</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <Users size={32} />
                        <p className="text-sm">No patients found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => {
                    const attendance = attendances.find(
                      (a) => a.patientId === patient.resident.id
                    );
                    const isPresent = attendance?.attendance;
                    return (
                      <tr
                        key={patient.resident.nic}
                        className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-5 py-3.5 text-sm text-gray-600">{patient.resident.nic}</td>
                        <td className="px-5 py-3.5 text-sm font-medium text-gray-800">{patient.resident.firstName}</td>
                        <td className="px-5 py-3.5">
                          <button
                            onClick={() => toggleAttendance(patient.resident.id)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                              isPresent
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                : "bg-rose-100 text-rose-700 hover:bg-rose-200"
                            }`}
                          >
                            {isPresent ? "Present" : "Absent"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Save Attendance */}
        <div className="flex justify-end mb-6">
          <button
            onClick={saveAttendance}
            disabled={loading}
            className={`px-6 py-2.5 rounded-lg font-semibold shadow-sm transition-colors ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#008FFB] hover:bg-[#006fbb] text-white"
            }`}
          >
            {loading ? "Saving..." : "Save Attendance"}
          </button>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default ClinicAttendances;
