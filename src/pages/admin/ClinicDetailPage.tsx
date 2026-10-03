import React, { useEffect, useState } from "react";
import {
  FaClinicMedical,
  FaEdit,
  FaTrash,
  FaClipboardList,
} from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { Search, Users, MapPin, CalendarClock } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import Modal from "../../components/layouts/overlays/Modal";
import { ClinicService } from "../../services/clinic.service";
import ResidentClinicService from "../../services/residentclinic.service";
import { Button } from "antd";
import { useAppSelector } from "../../hooks/state/hooks";

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
  const user = useAppSelector((state) => state.auth.user);

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
    patient.resident.firstName
      .toLowerCase()
      .includes(patientSearch.toLowerCase())
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

  const patientTotalPages = Math.ceil(
    filteredPatients.length / patientsPerPage
  );
  const divisionTotalPages = Math.ceil(
    filteredDivisions.length / divisionsPerPage
  );

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
      const data = await ResidentClinicService.getResidentsByClinicId(
        clinicId!
      );
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
      const data =
        await ResidentClinicService.getDivisionWiseResidentCountsForClinic(
          clinicId!
        );
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
      const created = await ClinicService.createClinicSession(
        clinicId!,
        newSession
      );
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
      await ClinicService.deleteClinicSession(
        clinicId!,
        sessionToDelete.sessionId
      );
      setClinicSessions(
        clinicSessions.filter((s) => s.sessionId !== sessionToDelete.sessionId)
      );
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
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#008FFB] to-[#00C1A7] px-8 py-8 shadow-lg mb-6">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -right-4 bottom-0 h-24 w-24 rounded-full bg-white/10" />
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
                <FaClinicMedical size={22} />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium tracking-wide uppercase">
                  Clinic Details
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {loadingClinicName ? "Loading..." : clinicName}
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-xl">
              <Users size={18} className="text-white" />
              <span className="text-white font-semibold">
                {clinicPatients.length} Patients
              </span>
            </div>
          </div>
        </div>

        {/* Patients & Divisions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Patients Table */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Users size={20} className="text-[#008FFB]" />
              <h3 className="text-lg font-semibold text-gray-800">
                Clinic Patients
              </h3>
            </div>

            {/* Search input for patients */}
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search patient by name..."
                value={patientSearch}
                onChange={(e) => {
                  setPatientSearch(e.target.value);
                  setPatientPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#008FFB]/30 focus:border-[#008FFB] outline-none transition-all"
                aria-label="Search Patients"
              />
            </div>

            {loadingPatients ? (
              <p className="text-center py-10 text-gray-400 text-sm">
                Loading patients...
              </p>
            ) : filteredPatients.length === 0 ? (
              <div className="flex flex-col items-center gap-2 text-gray-400 py-10">
                <Users size={28} />
                <p className="text-sm">No patients found</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Name</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Contact Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPatients.map((patient) => (
                        <tr
                          key={patient.resident.contactNumber}
                          className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">
                            {patient.resident.firstName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {patient.resident.contactNumber}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {patientTotalPages > 1 && (
                  <div className="mt-4 flex justify-center flex-wrap gap-2">
                    {[...Array(patientTotalPages)].map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPatientPage(idx + 1)}
                        className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors
                          ${
                            patientPage === idx + 1
                              ? "bg-[#008FFB] text-white shadow-sm"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        aria-label={`Go to patient page ${idx + 1}`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </section>

          {/* Divisions Table */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={20} className="text-[#008FFB]" />
              <h3 className="text-lg font-semibold text-gray-800">
                Patients Across Divisions
              </h3>
            </div>

            {/* Search input for divisions */}
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search division..."
                value={divisionSearch}
                onChange={(e) => {
                  setDivisionSearch(e.target.value);
                  setDivisionPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#008FFB]/30 focus:border-[#008FFB] outline-none transition-all"
                aria-label="Search Divisions"
              />
            </div>

            {loadingDivisions ? (
              <p className="text-center py-10 text-gray-400 text-sm">
                Loading divisions...
              </p>
            ) : filteredDivisions.length === 0 ? (
              <div className="flex flex-col items-center gap-2 text-gray-400 py-10">
                <MapPin size={28} />
                <p className="text-sm">No division data available</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Division</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentDivisions.map((division) => (
                        <tr
                          key={division.divisionName}
                          className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">
                            {division.divisionName}
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#008FFB]/10 text-[#008FFB] text-xs font-semibold">
                              {division.residentCount}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {divisionTotalPages > 1 && (
                  <div className="mt-4 flex justify-center flex-wrap gap-2">
                    {[...Array(divisionTotalPages)].map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setDivisionPage(idx + 1)}
                        className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors
                          ${
                            divisionPage === idx + 1
                              ? "bg-[#008FFB] text-white shadow-sm"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        aria-label={`Go to division page ${idx + 1}`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
        </div>

        {/* Add Clinic Session */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarClock size={20} className="text-[#008FFB]" />
            <h3 className="text-lg font-semibold text-gray-800">
              Add Session
            </h3>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addClinicSession();
            }}
            className="flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <input
              type="text"
              placeholder="Session Name"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-[#008FFB]/30 focus:border-[#008FFB] outline-none transition-all"
              value={newSession.name}
              onChange={(e) =>
                setNewSession({ ...newSession, name: e.target.value })
              }
              aria-label="Session Name"
            />
            <input
              type="date"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-[#008FFB]/30 focus:border-[#008FFB] outline-none transition-all"
              value={newSession.sessionDate}
              onChange={(e) =>
                setNewSession({ ...newSession, sessionDate: e.target.value })
              }
              aria-label="Session Date"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#008FFB] hover:bg-[#006fbb] text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-colors"
              aria-label="Add New Session"
            >
              <FiPlusCircle />
              New Session
            </button>
          </form>

          {/* Sessions List */}
          <div className="flex items-center gap-2 mt-8 mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Sessions
            </h3>
          </div>

          {loadingSessions ? (
            <p className="text-center py-10 text-gray-400 text-sm">
              Loading sessions...
            </p>
          ) : clinicSessions.length === 0 ? (
            <div className="flex flex-col items-center gap-2 text-gray-400 py-10">
              <CalendarClock size={28} />
              <p className="text-sm">No sessions available</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Name</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Date</th>
                    {user?.permissions.includes("clinic:edit") && (
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 text-right">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {clinicSessions.map((session) => (
                    <tr
                      key={session.sessionId}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{session.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{session.sessionDate}</td>
                      {user?.permissions.includes("clinic:edit") && (
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openEditModal(session)}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-amber-600 hover:bg-amber-50 rounded-lg font-medium text-sm transition-colors"
                            >
                              <FaEdit size={13} />
                              Edit
                            </button>
                            <button
                              onClick={() => confirmRemoveClinicSession(session)}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg font-medium text-sm transition-colors"
                            >
                              <FaTrash size={13} />
                              Delete
                            </button>
                            <button
                              onClick={() => handleClick(session.sessionId)}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg font-medium text-sm transition-colors"
                            >
                              <FaClipboardList size={13} />
                              Attendance
                            </button>
                          </div>
                        </td>
                      )}
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
                <p className="text-red-600 font-semibold text-center">
                  {error}
                </p>
              )}
              <label className="font-semibold">
                Session Name:
                <input
                  type="text"
                  value={selectedSession.name}
                  onChange={(e) =>
                    setSelectedSession({
                      ...selectedSession,
                      name: e.target.value,
                    })
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
                    setSelectedSession({
                      ...selectedSession,
                      sessionDate: e.target.value,
                    })
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
