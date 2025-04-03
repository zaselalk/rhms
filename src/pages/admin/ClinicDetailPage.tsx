import React, { useState } from "react";
import { FaClinicMedical, FaEdit, FaTrash, FaClipboardList, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router"; // Import useNavigate for routing
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import Modal from "../../components/layouts/overlays/Modal"; // Import the Modal component

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

  const [clinicSessions, setClinicSessions] = useState<ClinicSession[]>([
    { id: "session001", sessionName: "Diabetes Awareness", date: "2025-04-01" },
    { id: "session002", sessionName: "Free Check-up", date: "2025-04-10" },
  ]);

  const [newSession, setNewSession] = useState({
    sessionName: "",
    date: "",
  });

  const [editModalOpen, setEditModalOpen] = useState(false); // Modal state for editing session
  const [selectedSession, setSelectedSession] = useState<ClinicSession | null>(null); // Selected session to edit
  const [error, setError] = useState<string>(""); // Error message state
  const navigate = useNavigate(); // Initialize the navigate function for routing

  const addClinicSession = () => {
    if (!newSession.sessionName || !newSession.date) {
      setError("Session Name and Date cannot be empty!");
      return; // Don't proceed if fields are empty
    }

    const newSessionId = `session${clinicSessions.length + 1}`;
    const session = { id: newSessionId, ...newSession };
    setClinicSessions([...clinicSessions, session]);
    setNewSession({ sessionName: "", date: "" });
    setError(""); // Clear any previous error
  };

  const removeClinicSession = (sessionId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this session?");
    if (confirmDelete) {
      setClinicSessions(clinicSessions.filter((session) => session.id !== sessionId));
    }
  };

  const openEditModal = (session: ClinicSession) => {
    setSelectedSession(session);
    setEditModalOpen(true); // Open the modal to edit the selected session
  };

  const closeEditModal = () => {
    setSelectedSession(null);
    setEditModalOpen(false); // Close the modal
  };

  const handleSaveEditedSession = () => {
    if (selectedSession) {
      setClinicSessions(
        clinicSessions.map((session) =>
          session.id === selectedSession.id
            ? { ...session, sessionName: selectedSession.sessionName, date: selectedSession.date }
            : session
        )
      );
    }
    closeEditModal(); // Close the modal after saving
  };

  return (
    <DashboardContainer>
      <div className="p-6 w-full min-h-screen">
        <div className="flex justify-between items-center mb-6 bg-white p-4 shadow rounded-lg">
          <div className="flex items-center space-x-3">
            <FaClinicMedical className="text-blue-600 text-3xl" />
            <h2 className="text-lg font-bold">Clinic Details</h2>
          </div>
        </div>

        {/* Clinic Overview Section */}
        <div className="flex justify-center items-center bg-white p-6 shadow-md rounded-lg mb-6">
          <FaClinicMedical className="text-blue-500 text-5xl mr-4" />
          <div>
            <p className="text-4xl font-bold">236</p>
            <p className="text-gray-500">Diabetic</p>
          </div>
        </div>

        {/* Clinic Patients and Divisions Tables */}
        <div className="grid grid-cols-2 gap-6">
          {/* Clinic Patients Table */}
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

          {/* Clinic Patient Divisions Table */}
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

        {/* Add Session Form Section */}
        <div className="bg-white p-6 shadow-md rounded-lg mt-6">
          <h3 className="text-xl font-semibold mb-4">Add Session</h3>
          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Error message */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Session Name"
              value={newSession.sessionName}
              onChange={(e) => setNewSession({ ...newSession, sessionName: e.target.value })}
              className="border p-2 w-full rounded-lg mb-4"
            />
            <input
              type="date"
              value={newSession.date}
              onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
              className="border p-2 w-full rounded-lg"
            />
          </div>
          <button
            onClick={addClinicSession}
            className="bg-blue-500 text-white px-4 py-2 flex items-center rounded-lg shadow hover:bg-blue-600 transition"
          >
            <FaPlus className="mr-2" /> Add Session
          </button>
        </div>

        {/* Clinic Sessions Table */}
        <div className="bg-white p-6 shadow-md rounded-lg mt-6">
          <h3 className="text-xl font-semibold mb-4">Clinic Sessions</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Session Name</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clinicSessions.map((session, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{session.sessionName}</td>
                  <td className="p-2">{session.date}</td>
                  <td className="p-2 flex space-x-3">
                    <button
                      onClick={() => navigate("attendance")} // Navigate to the attendance page
                      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                    >
                      <FaClipboardList className="mr-2" /> Get Attendance
                    </button>
                    <button
                      onClick={() => openEditModal(session)} // Open edit modal
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
                    >
                      <FaEdit className="mr-2" /> Edit Session
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                      onClick={() => removeClinicSession(session.id)}
                    >
                      <FaTrash className="mr-2" /> Remove Session
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Session Modal */}
      <Modal
        isOpen={editModalOpen}
        handleClose={closeEditModal}
        title="Edit Session"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={selectedSession?.sessionName || ""}
            onChange={(e) =>
              setSelectedSession({ ...selectedSession!, sessionName: e.target.value })
            }
            className="border p-2 w-full rounded-lg"
            placeholder="Session Name"
          />
          <input
            type="date"
            value={selectedSession?.date || ""}
            onChange={(e) =>
              setSelectedSession({ ...selectedSession!, date: e.target.value })
            }
            className="border p-2 w-full rounded-lg"
          />
          <div className="flex justify-end space-x-3">
            <button
              onClick={closeEditModal}
              className="bg-gray-300 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEditedSession}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </DashboardContainer>
  );
};

export default ClinicDetail;
