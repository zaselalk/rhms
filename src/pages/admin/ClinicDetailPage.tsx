import React, { useEffect, useState } from "react";
import {
  FaClinicMedical,
  FaEdit,
  FaTrash,
  FaClipboardList,
} from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import Modal from "../../components/layouts/overlays/Modal";
import { ClinicService } from "../../services/clinic.service";
import ResidentClinicService from "../../services/residentclinic.service";

interface Patient {
  id: string;
  name: string;
}

interface ClinicSession {
  id: string;
  name: string;
  sessionDate: string;
}

const ClinicDetail: React.FC = () => {
  const { clinicId } = useParams<{ clinicId: string }>();
  const [clinicName, setClinicName] = useState("");
  const [clinicSessions, setClinicSessions] = useState<ClinicSession[]>([]);
  const [newSession, setNewSession] = useState({ name: "", sessionDate: "" });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<ClinicSession | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [loadingClinicName, setLoadingClinicName] = useState(false);

  // Updated: Dynamic clinic patients
  const [clinicPatients, setClinicPatients] = useState<Patient[]>([]);

  const patientDivisions = [
    { division: "Katugahahena", count: 2 },
    { division: "Diyagala", count: 1 },
    { division: "Kotagedara", count: 3 },
    { division: "Maddegadara", count: 1 },
    { division: "Nawutthuduwa", count: 0 },
    { division: "Kolahekada", count: 2 },
    { division: "Hempita", count: 1 },
    { division: "Karampathara", count: 0 },
    { division: "Katugoda", count: 0 },
    { division: "Delgoda", count: 0 },
    { division: "Pahalawela", count: 1 },
  ];

  if (!clinicId) {
    console.error("Clinic ID is not available");
    return <div>Error: Clinic ID is not available.</div>;
  }

  const [patientPage, setPatientPage] = useState(1);
  const patientsPerPage = 10;
  const patientStartIndex = (patientPage - 1) * patientsPerPage;
  const patientEndIndex = patientStartIndex + patientsPerPage;
  const currentPatients = clinicPatients.slice(
    patientStartIndex,
    patientEndIndex
  );
  const patientTotalPages = Math.ceil(clinicPatients.length / patientsPerPage);

  const [divisionPage, setDivisionPage] = useState(1);
  const divisionsPerPage = 10;
  const divisionStartIndex = (divisionPage - 1) * divisionsPerPage;
  const divisionEndIndex = divisionStartIndex + divisionsPerPage;
  const currentDivisions = patientDivisions.slice(
    divisionStartIndex,
    divisionEndIndex
  );
  const divisionTotalPages = Math.ceil(patientDivisions.length / divisionsPerPage);
  const navigate = useNavigate();

  const handleClick = (sessionId: string) => {
    navigate(`/admin/clinic/${clinicId}/${sessionId}/attendance`);
  };

  const fetchClinicName = async () => {
    setLoadingClinicName(true);
    try {
      const data = await ClinicService.getClinicById(clinicId);
      setClinicName(data.name);
    } catch (err) {
      console.error("Failed to fetch clinic name:", err);
      setError("Failed to load clinic name.");
    } finally {
      setLoadingClinicName(false);
    }
  };

  const fetchSessions = async () => {
    setLoadingSessions(true);
    try {
      const sessions = await ClinicService.getClinicSessions(clinicId);
      setClinicSessions(sessions);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
      setError("Failed to load sessions.");
    } finally {
      setLoadingSessions(false);
    }
  };

  // ✅ New: Fetch patients for this clinic
  const fetchClinicPatients = async () => {
    try {
      const data = await ResidentClinicService.getResidentsByClinicId(clinicId);
      setClinicPatients(data);
    } catch (err) {
      console.error("Failed to fetch clinic patients:", err);
      setError("Failed to load clinic patients.");
    }
  };

  const addClinicSession = async () => {
    if (!newSession.name || !newSession.sessionDate) {
      setError("Session Name and Date cannot be empty!");
      return;
    }
    setError("");
    try {
      const created = await ClinicService.createClinicSession(
        clinicId,
        newSession
      );
      setClinicSessions([...clinicSessions, created]);
      setNewSession({ name: "", sessionDate: "" });
    } catch (err) {
      console.error("Error creating session:", err);
      setError("Failed to create session.");
    }
  };

  const removeClinicSession = async (sessionId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this session?"
    );
    if (!confirmDelete) return;

    try {
      await ClinicService.deleteClinicSession(clinicId, sessionId);
      setClinicSessions(
        clinicSessions.filter((s) => s.id !== sessionId)
      );
    } catch (err) {
      console.error("Failed to delete session:", err);
      setError("Failed to delete session.");
    }
  };

  const openEditModal = (session: ClinicSession) => {
    setSelectedSession(session);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedSession(null);
    setEditModalOpen(false);
    setError("");
  };

  const handleSaveEditedSession = async () => {
    if (!selectedSession) return;

    if (!selectedSession.name || !selectedSession.sessionDate) {
      setError("Session Name and Date cannot be empty!");
      return;
    }

    try {
      await ClinicService.updateClinicSession(clinicId, selectedSession);
      setClinicSessions(
        clinicSessions.map((s) =>
          s.id === selectedSession.id ? selectedSession : s
        )
      );
      closeEditModal();
    } catch (err) {
      console.error("Failed to update session:", err);
      setError("Failed to update session.");
    }
  };

  useEffect(() => {
    if (clinicId) {
      fetchClinicName();
      fetchSessions();
      fetchClinicPatients(); // ✅ fetch patients here
    }
  }, [clinicId]);

  const renderPatientPagination = () => (
    <div className="mt-4 flex justify-center space-x-2">
      {[...Array(patientTotalPages)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => setPatientPage(idx + 1)}
          className={`px-3 py-1 border rounded ${
            patientPage === idx + 1 ? "bg-blue-600 text-white" : "bg-white"
          }`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );

  const renderDivisionPagination = () => (
    <div className="mt-4 flex justify-center space-x-2">
      {[...Array(divisionTotalPages)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => setDivisionPage(idx + 1)}
          className={`px-3 py-1 border rounded ${
            divisionPage === idx + 1 ? "bg-blue-600 text-white" : "bg-white"
          }`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );

  return (
    <DashboardContainer>
      <div className="p-6 w-full min-h-screen">
        <div className="flex justify-between items-center mb-6 bg-white p-4 shadow rounded-lg">
          <div className="flex items-center space-x-3">
            <FaClinicMedical className="text-[#008FFB] text-3xl" />
            <h2 className="text-2xl font-bold text-[#008FFB]">Clinic Details</h2>
            {loadingClinicName ? (
              <p>Loading...</p>
            ) : (
              <p className="text-l font-semibold text-[#008FFB]">({clinicName})</p>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center bg-white p-6 shadow-md rounded-lg mb-6">
          <FaClinicMedical className="text-[#008FFB] text-5xl mr-4" />
          <div>
            <p className="text-l font-bold">Patients</p>
            <p className="text-4xl font-bold">{clinicPatients.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Patients Table */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Clinic Patients</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">Name</th>
                </tr>
              </thead>
              <tbody>
                {currentPatients.map((patient, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{patient.id}</td>
                    <td className="p-2">{patient.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {renderPatientPagination()}
          </div>

          {/* Division Table (Static) */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Patient Distribution Across Divisions</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Division</th>
                  <th className="text-left p-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {currentDivisions.map((division, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{division.division}</td>
                    <td className="p-2">{division.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {renderDivisionPagination()}
          </div>
        </div>

        {/* Rest of your session and modal UI remains unchanged below... */}
        {/* ... */}
      </div>
    </DashboardContainer>
  );
};

export default ClinicDetail;
