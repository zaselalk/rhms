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
import { Button } from "antd";

interface Patient {
  resident: {
    contactNumber: string;
    firstName: string;
  };
}

interface DivisionCount {
  divisionName: string;
  residentCount: number;
}

export interface ClinicSession {
  clinicId: string;
  sessionId: string;
  name: string;
  sessionDate: string;
}

const ClinicDetail: React.FC = () => {
  const { clinicId } = useParams<{ clinicId: string }>();
  const navigate = useNavigate();

  const [clinicName, setClinicName] = useState("");
  const [clinicSessions, setClinicSessions] = useState<ClinicSession[]>([]);
  const [clinicPatients, setClinicPatients] = useState<Patient[]>([]);
  const [patientDivisions, setPatientDivisions] = useState<DivisionCount[]>([]);
  const [newSession, setNewSession] = useState({ name: "", sessionDate: "" });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<ClinicSession | null>(
    null
  );
  const [error, setError] = useState<string>("");

  const [loadingClinicName, setLoadingClinicName] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [loadingDivisions, setLoadingDivisions] = useState(false);

  const [patientPage, setPatientPage] = useState(1);
  const [divisionPage, setDivisionPage] = useState(1);

  // Search states
  const [patientSearch, setPatientSearch] = useState("");
  const [divisionSearch, setDivisionSearch] = useState("");

  // Confirmation modal states for delete
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<ClinicSession | null>(
    null
  );

  const patientsPerPage = 10;
  const divisionsPerPage = 10;

  // Filter patients based on search input (case-insensitive)
  const filteredPatients = clinicPatients.filter((patient) =>
    patient.resident.firstName.toLowerCase().includes(patientSearch.toLowerCase())
  );

  // Filter divisions based on search input (case-insensitive)
  const filteredDivisions = patientDivisions.filter((division) =>
    division.divisionName.toLowerCase().includes(divisionSearch.toLowerCase())
  );

  const currentPatients = filteredPatients.slice(
    (patientPage - 1) * patientsPerPage,
    patientPage * patientsPerPage
  );

  const currentDivisions = filteredDivisions.slice(
    (divisionPage - 1) * divisionsPerPage,
    divisionPage * divisionsPerPage
  );

  const patientTotalPages = Math.ceil(filteredPatients.length / patientsPerPage);
  const divisionTotalPages = Math.ceil(filteredDivisions.length / divisionsPerPage);

  // Fetch clinic name by ID
  const fetchClinicName = async () => {
    setLoadingClinicName(true);
    try {
      const data = await ClinicService.getClinicById(clinicId!);
      setClinicName(data.name);
    } catch (err) {
      console.error("Failed to fetch clinic name:", err);
      setError("Failed to load clinic name.");
    } finally {
      setLoadingClinicName(false);
    }
  };

  // Fetch all sessions for the clinic
  const fetchSessions = async () => {
    setLoadingSessions(true);
    try {
      const sessions = await ClinicService.getClinicSessions(clinicId!);
      setClinicSessions(sessions);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
      setError("Failed to load sessions.");
    } finally {
      setLoadingSessions(false);
    }
  };

  // Fetch patients registered at this clinic
  const fetchClinicPatients = async () => {
    setLoadingPatients(true);
    try {
      const data = await ResidentClinicService.getResidentsByClinicId(clinicId!);
      setClinicPatients(data);
    } catch (err) {
      console.error("Failed to fetch patients:", err);
      setClinicPatients([]);
    } finally {
      setLoadingPatients(false);
    }
  };

  // Fetch resident counts grouped by division for this clinic
  const fetchDivisionCounts = async () => {
    setLoadingDivisions(true);
    try {
      const data = await ResidentClinicService.getDivisionWiseResidentCountsForClinic(clinicId!);
      setPatientDivisions(data);
    } catch (err) {
      console.error("Failed to fetch division counts:", err);
      setPatientDivisions([]);
    } finally {
      setLoadingDivisions(false);
    }
  };

  // On component mount or clinicId change, fetch all necessary data
  useEffect(() => {
    if (clinicId) {
      fetchClinicName();
      fetchSessions();
      fetchClinicPatients();
      fetchDivisionCounts();
    }
  }, [clinicId]);

  // Add new clinic session
  const addClinicSession = async () => {
    if (!newSession.name || !newSession.sessionDate) {
      setError("Session Name and Date cannot be empty!");
      return;
    }
    setError("");
    try {
      const created = await ClinicService.createClinicSession(clinicId!, newSession);
      setClinicSessions([...clinicSessions, created]);
      setNewSession({ name: "", sessionDate: "" });
    } catch (err) {
      console.error("Error creating session:", err);
      setError("Failed to create session.");
    }
  };

  // Open confirmation modal for deleting a session
  const confirmRemoveClinicSession = (session: ClinicSession) => {
    setSessionToDelete(session);
    setDeleteConfirmOpen(true);
  };

  // Actual delete function called on confirm
  const handleConfirmDelete = async () => {
    if (!sessionToDelete) return;

    try {
      await ClinicService.deleteClinicSession(clinicId!, sessionToDelete.sessionId);
      setClinicSessions(clinicSessions.filter((s) => s.sessionId !== sessionToDelete.sessionId));
      setDeleteConfirmOpen(false);
      setSessionToDelete(null);
    } catch (err) {
      console.error("Failed to delete session:", err);
      setError("Failed to delete session.");
      setDeleteConfirmOpen(false);
      setSessionToDelete(null);
    }
  };

  // Cancel delete confirmation
  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setSessionToDelete(null);
  };

  // Open modal to edit a session
  const openEditModal = (session: ClinicSession) => {
    setSelectedSession(session);
    setEditModalOpen(true);
  };

  // Close the edit modal and clear errors
  const closeEditModal = () => {
    setSelectedSession(null);
    setEditModalOpen(false);
    setError("");
  };

  // Save changes to an edited session
  const handleSaveEditedSession = async () => {
    if (!selectedSession) return;

    if (!selectedSession.name || !selectedSession.sessionDate) {
      setError("Session Name and Date cannot be empty!");
      return;
    }

    try {
      const updatedSession = await ClinicService.updateClinicSession(
        clinicId!,
        selectedSession
      );
      setClinicSessions(
        clinicSessions.map((s) =>
          s.sessionId === updatedSession.id ? updatedSession : s
        )
      );
      closeEditModal();
    } catch (err) {
      console.error("Failed to update session:", err);
      setError("Failed to update session.");
    }
  };

  // Navigate to attendance page of a session
  const handleClick = (sessionId: string) => {
    navigate(`/admin/clinic/${clinicId}/${sessionId}/attendance`);
  };

  return (
    <DashboardContainer>
      <div className="p-6 w-full min-h-screen bg-gray-50">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <FaClinicMedical className="text-[#008FFB] text-4xl" />
            <h2 className="text-3xl font-extrabold text-[#008FFB] tracking-wide">
              Clinic Details
            </h2>
            {loadingClinicName ? (
              <p className="text-lg font-semibold text-gray-500 italic ml-2">
                Loading...
              </p>
            ) : (
              <p className="text-2xl font-bold text-[#008FFB] ml-2">({clinicName})</p>
            )}
          </div>
        </div>

        {/* Summary Card */}
        <div className="max-w-xs mx-auto sm:mx-0 sm:max-w-none flex justify-center items-center bg-white p-8 rounded-xl shadow-lg mb-8">
          <FaClinicMedical className="text-[#008FFB] text-6xl mr-6" />
          <div>
            <p className="text-xl font-semibold text-gray-700 mb-1">Patients</p>
            <p className="text-5xl font-bold text-[#008FFB]">{clinicPatients.length}</p>
          </div>
        </div>

        {/* Patients & Divisions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Patients Table */}
          <section className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <h3 className="text-2xl font-semibold mb-6 border-b pb-2">
              Clinic Patients
            </h3>

            {/* Search input for patients */}
            <input
              type="text"
              placeholder="Search patient by name..."
              value={patientSearch}
              onChange={(e) => {
                setPatientSearch(e.target.value);
                setPatientPage(1);
              }}
              className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008FFB]"
              aria-label="Search Patients"
            />

            {loadingPatients ? (
              <p className="text-center py-10 text-gray-500 italic">Loading patients...</p>
            ) : filteredPatients.length === 0 ? (
              <p className="text-center py-10 text-gray-500 italic">No patients found.</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#008FFB] text-white">
                        <th className="p-3">Name</th>
                        <th className="p-3">Contact Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPatients.map((patient) => (
                        <tr
                          key={patient.resident.contactNumber}
                          className="border-b hover:bg-gray-100 transition"
                        >
                          <td className="p-3 font-mono">{patient.resident.firstName}</td>
                          <td className="p-3 font-medium">{patient.resident.contactNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center space-x-3">
                  {[...Array(patientTotalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPatientPage(idx + 1)}
                      className={`px-4 py-2 rounded-lg border font-semibold transition
                        ${
                          patientPage === idx + 1
                            ? "bg-[#008FFB] text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-gray-200"
                        }`}
                      aria-label={`Go to patient page ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </section>

          {/* Divisions Table */}
          <section className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <h3 className="text-2xl font-semibold mb-6 border-b pb-2">
              Patient Across Divisions
            </h3>

            {/* Search input for divisions */}
            <input
              type="text"
              placeholder="Search division..."
              value={divisionSearch}
              onChange={(e) => {
                setDivisionSearch(e.target.value);
                setDivisionPage(1);
              }}
              className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008FFB]"
              aria-label="Search Divisions"
            />

            {loadingDivisions ? (
              <p className="text-center py-10 text-gray-500 italic">Loading divisions...</p>
            ) : filteredDivisions.length === 0 ? (
              <p className="text-center py-10 text-gray-500 italic">No division data available.</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#008FFB] text-white">
                        <th className="p-3">Division</th>
                        <th className="p-3">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentDivisions.map((division) => (
                        <tr
                          key={division.divisionName}
                          className="border-b hover:bg-gray-100 transition"
                        >
                          <td className="p-3 font-medium">{division.divisionName}</td>
                          <td className="p-3 font-semibold text-center">{division.residentCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center space-x-3">
                  {[...Array(divisionTotalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setDivisionPage(idx + 1)}
                      className={`px-4 py-2 rounded-lg border font-semibold transition
                        ${
                          divisionPage === idx + 1
                            ? "bg-[#008FFB] text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-gray-200"
                        }`}
                      aria-label={`Go to division page ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>

        {/* Add Clinic Session */}
        <section className="bg-white rounded-lg shadow-md p-6 mt-10 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 border-b pb-2">Add Session</h3>

          {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addClinicSession();
            }}
            className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <input
              type="text"
              placeholder="Session Name"
              className="flex-1 border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#008FFB]"
              value={newSession.name}
              onChange={(e) => setNewSession({ ...newSession, name: e.target.value })}
              aria-label="Session Name"
            />
            <input
              type="date"
              className="border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#008FFB]"
              value={newSession.sessionDate}
              onChange={(e) => setNewSession({ ...newSession, sessionDate: e.target.value })}
              aria-label="Session Date"
            />
            <button
              type="submit"
              className="flex items-center bg-[#008FFB] hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg shadow transition"
              aria-label="Add New Session"
            >
              <FiPlusCircle className="mr-2 text-xl" />
              New Session
            </button>
          </form>

          {/* Sessions List */}
          <h3 className="text-2xl font-semibold mt-10 mb-6 border-b pb-2">Sessions</h3>

          {loadingSessions ? (
            <p className="text-center py-10 text-gray-500 italic">Loading sessions...</p>
          ) : clinicSessions.length === 0 ? (
            <p className="text-center py-10 text-gray-500 italic">No sessions available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#008FFB] text-white">
                    <th className="p-3">Name</th>
                    <th className="p-3">Date</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clinicSessions.map((session) => (
                    <tr
                      key={session.sessionId}
                      className="border-b hover:bg-gray-100 transition"
                    >
                      <td className="p-3 font-medium">{session.name}</td>
                      <td className="p-3">{session.sessionDate}</td>
                      <td className="p-3 text-center space-x-2">
                        <Button
                          type="default"
                          ghost
                          icon={<FaEdit />}
                          onClick={() => openEditModal(session)}
                          style={{
                            borderColor: "#facc15", // yellow-400
                            color: "#facc15",
                            fontWeight: "600",
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          type="default"
                          ghost
                          danger
                          icon={<FaTrash />}
                          onClick={() => confirmRemoveClinicSession(session)}
                          style={{
                            fontWeight: "600",
                          }}
                        >
                          Delete
                        </Button>

                        <Button
                          type="default"
                          ghost
                          icon={<FaClipboardList />}
                          onClick={() => handleClick(session.sessionId)}
                          style={{
                            borderColor: "#22c55e", // green-500
                            color: "#22c55e",
                            fontWeight: "600",
                          }}
                        >
                          Attendance
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Confirmation Modal for Deletion */}
        {deleteConfirmOpen && sessionToDelete && (
          <Modal
            title="Confirm Delete"
            isOpen={deleteConfirmOpen}
            handleClose={handleCancelDelete}
          >
            <div className="p-4">
              <p className="mb-4">
                Are you sure you want to delete the session &quot;
                <strong>{sessionToDelete.name}</strong>&quot;?
              </p>
              <div className="flex justify-end space-x-3">
                <Button onClick={handleCancelDelete}>Cancel</Button>
                <Button type="primary" danger onClick={handleConfirmDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {/* Edit Modal */}
        {editModalOpen && selectedSession && (
          <Modal
            title="Edit Session"
            isOpen={editModalOpen}
            handleClose={closeEditModal}
          >
            <div className="p-4 flex flex-col space-y-4">
              {error && (
                <p className="text-red-600 font-semibold text-center">{error}</p>
              )}
              <label className="font-semibold">
                Session Name:
                <input
                  type="text"
                  value={selectedSession.name}
                  onChange={(e) =>
                    setSelectedSession({ ...selectedSession, name: e.target.value })
                  }
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008FFB]"
                  aria-label="Edit Session Name"
                />
              </label>
              <label className="font-semibold">
                Session Date:
                <input
                  type="date"
                  value={selectedSession.sessionDate}
                  onChange={(e) =>
                    setSelectedSession({ ...selectedSession, sessionDate: e.target.value })
                  }
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008FFB]"
                  aria-label="Edit Session Date"
                />
              </label>

              <div className="flex justify-end space-x-3">
                <Button onClick={closeEditModal}>Cancel</Button>
                <Button type="primary" onClick={handleSaveEditedSession}>
                  Save
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </DashboardContainer>
  );
};

export default ClinicDetail;
