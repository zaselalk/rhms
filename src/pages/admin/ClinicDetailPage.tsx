import React, { useEffect, useState } from "react";
import { FaClinicMedical, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useParams } from "react-router";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import Modal from "../../components/layouts/overlays/Modal";
import { ClinicService } from "../../services/clinic.service";

interface Patient {
  id: string;
  name: string;
}

interface ClinicSession {
  id: string;
  sessionName: string;
  date: string;
}

const ClinicDetail: React.FC = () => {
  const { clinic } = useParams();
  const [, setClinicName] = useState("");
  const [clinicSessions, setClinicSessions] = useState<ClinicSession[]>([]);
  const [newSession, setNewSession] = useState({ name: "", sessionDate: "" });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<ClinicSession | null>(null);
  const [error, setError] = useState<string>("");

  const clinicPatients: Patient[] = [
    { id: "DB001", name: "Ashfa" },
    { id: "DB002", name: "Asela" },
    { id: "DB003", name: "Ravindu" },
    { id: "DB004", name: "Dilukshi" },
    { id: "DB005", name: "Ashfa" },
    { id: "DB006", name: "Ashfa" },
  ];

  const patientDivisions = [
    { division: "Katugahahena", count: 20 },
    { division: "Diyagala", count: 34 },
    { division: "Kotagedara", count: 23 },
    { division: "Maddegadara", count: 32 },
    { division: "Nawutthuduwa", count: 23 },
    { division: "Kolahekada", count: 34 },
    { division: "Hempita", count: 34 },
    { division: "Karampathara", count: 23 },
    { division: "Katugoda", count: 12 },
    { division: "Delgoda", count: 56 },
  ];

  const fetchClinicName = async () => {
    try {
      const data = await ClinicService.getClinicById(clinic!);
      setClinicName(data.name);
    } catch (err) {
      console.error("Failed to fetch clinic name:", err);
    }
  };

  const fetchSessions = async () => {
    try {
      const sessions = await ClinicService.getClinicSessions(clinic!);
      setClinicSessions(sessions);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    }
  };

  const addClinicSession = async () => {
    if (!newSession.name || !newSession.sessionDate) {
      setError("Session Name and Date cannot be empty!");
      return;
    }

    try {
      const created = await ClinicService.createClinicSession(clinic!, newSession);
      setClinicSessions([...clinicSessions, created]);
      setNewSession({ name: "", sessionDate: "" });
      setError("");
    } catch (err) {
      console.error("Error creating session:", err);
      setError("Failed to create session.");
    }
  };

  const removeClinicSession = (sessionId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this session?");
    if (confirmDelete) {
      setClinicSessions(clinicSessions.filter((s) => s.id !== sessionId));
      // TODO: Add backend delete call if needed
    }
  };

  const openEditModal = (session: ClinicSession) => {
    setSelectedSession(session);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedSession(null);
    setEditModalOpen(false);
  };

  const handleSaveEditedSession = () => {
    if (selectedSession) {
      setClinicSessions(
        clinicSessions.map((s) =>
          s.id === selectedSession.id ? { ...s, sessionName: selectedSession.sessionName, date: selectedSession.date } : s
        )
      );
    }
    closeEditModal();
  };

  useEffect(() => {
    if (clinic) {
      fetchClinicName();
      fetchSessions();
    }
  }, [clinic]);

  return (
    <DashboardContainer>
      <div className="p-6 w-full min-h-screen">
        <div className="flex justify-between items-center mb-6 bg-white p-4 shadow rounded-lg">
          <div className="flex items-center space-x-3">
            <FaClinicMedical className="text-blue-600 text-3xl" />
            <h2 className="text-lg font-bold">Clinic Details</h2>
            <p className="text-sg font-bold">({clinic})</p>
          </div>
        </div>

        <div className="flex justify-center items-center bg-white p-6 shadow-md rounded-lg mb-6">
          <FaClinicMedical className="text-blue-500 text-5xl mr-4" />
          <div>
            <p className="text-l font-bold">Patients</p>
            <p className="text-4xl font-bold">291</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
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
                {clinicPatients.map((patient, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{patient.id}</td>
                    <td className="p-2">{patient.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Clinic Patient Divisions</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Division</th>
                  <th className="text-left p-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {patientDivisions.map((division, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{division.division}</td>
                    <td className="p-2">{division.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg mt-6">
          <h3 className="text-xl font-semibold mb-4">Add Session</h3>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="text"
              placeholder="Session Name"
              className="border p-2 rounded w-1/2"
              value={newSession.name}
              onChange={(e) => setNewSession({ ...newSession, name: e.target.value })}
            />
            <input
              type="date"
              className="border p-2 rounded"
              value={newSession.sessionDate}
              onChange={(e) => setNewSession({ ...newSession, sessionDate: e.target.value })}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addClinicSession}>
              <FaPlus /> Add
            </button>
          </div>

          <h3 className="text-xl font-semibold mb-4">Clinic Sessions</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clinicSessions.map((session) => (
                <tr key={session.id} className="border-b">
                  <td className="p-2">{session.id}</td>
                  <td className="p-2">{session.sessionName}</td>
                  <td className="p-2">{session.date}</td>
                  <td className="p-2 space-x-2">
                    <button onClick={() => openEditModal(session)}><FaEdit className="text-yellow-500" /></button>
                    <button onClick={() => removeClinicSession(session.id)}><FaTrash className="text-red-500" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editModalOpen && selectedSession && (
          <Modal title="Add Session" isOpen={editModalOpen} handleClose={()=>setEditModalOpen(false)}>
            <div>
              <h3 className="text-xl font-semibold mb-4">Edit Session</h3>
              <input
                type="text"
                className="border p-2 rounded w-full mb-2"
                value={selectedSession.sessionName}
                onChange={(e) => setSelectedSession({ ...selectedSession, sessionName: e.target.value })}
              />
              <input
                type="date"
                className="border p-2 rounded w-full mb-4"
                value={selectedSession.date}
                onChange={(e) => setSelectedSession({ ...selectedSession, date: e.target.value })}
              />
              <div className="flex justify-end space-x-2">
                <button className="bg-gray-300 px-4 py-2 rounded" onClick={closeEditModal}>Cancel</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSaveEditedSession}>
                  Save
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </DashboardContainer>
  );
};

export default ClinicDetail;
