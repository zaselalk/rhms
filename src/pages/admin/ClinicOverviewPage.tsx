// components/clinic/ClinicOverview.tsx
import React, { useState, useEffect } from "react";
import { FaClinicMedical, FaTrash } from "react-icons/fa";
import { FiPlusCircle, FiEdit } from "react-icons/fi";
import { Stethoscope, Users } from "lucide-react";
import Modal from "../../components/layouts/overlays/Modal";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { Link } from "react-router";
import { ClinicService } from "../../services/clinic.service";
import { useAppSelector } from "../../hooks/state/hooks";

const avatarPalette = [
  "bg-[#008FFB]/10 text-[#008FFB]",
  "bg-emerald-100 text-emerald-600",
  "bg-purple-100 text-purple-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
];

const avatarColor = (seed: string) => {
  const index = seed.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return avatarPalette[index % avatarPalette.length];
};

const ClinicOverviewPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [clinicTitle, setClinicTitle] = useState("");
  const [clinicCategories, setClinicCategories] = useState<any[]>([]);
  const [clinicToDelete, setClinicToDelete] = useState<string | null>(null);
  const [clinicToEdit, setClinicToEdit] = useState<string | null>(null);
  const user = useAppSelector((state) => state.auth.user);

  // Fetch all clinics when the component mounts
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const data = await ClinicService.getAllClinics();
        setClinicCategories(data);
      } catch (error) {
        console.error("Error fetching clinics:", error);
      }
    };
    fetchClinics();
  }, []);

  // Handle creating a new clinic
  const handleCreateClinic = async () => {
    if (clinicTitle.trim()) {
      // Check for duplicate clinic name
      const isDuplicate = clinicCategories.some(
        (clinic) => clinic.name.toLowerCase() === clinicTitle.toLowerCase()
      );

      if (isDuplicate) {
        alert(
          "A clinic with this name already exists. Please choose a different name."
        );
        return;
      }

      try {
        const newClinic = await ClinicService.createClinic({
          name: clinicTitle,
        });
        setClinicCategories((prevCategories) => [...prevCategories, newClinic]);
        setShowModal(false);
        setClinicTitle(""); // Reset the input field
      } catch (error) {
        console.error("Error creating clinic:", error);
      }
    }
  };

  // Handle deleting a clinic (show confirmation modal)
  const handleDeleteClick = (clinicId: string) => {
    setClinicToDelete(clinicId);
    setShowConfirmDeleteModal(true);
  };

  // Confirm deletion of the clinic
  const handleConfirmDelete = async () => {
    if (clinicToDelete) {
      try {
        await ClinicService.deleteClinic(clinicToDelete);
        setClinicCategories((prevCategories) =>
          prevCategories.filter((clinic) => clinic.id !== clinicToDelete)
        );
      } catch (error) {
        console.error("Error deleting clinic:", error);
      }
    }
    setShowConfirmDeleteModal(false);
    setClinicToDelete(null);
  };

  // Cancel deletion and close the modal
  const handleCancelDelete = () => {
    setShowConfirmDeleteModal(false);
    setClinicToDelete(null);
  };

  // Handle editing a clinic's name
  const handleEditClick = (clinicId: string) => {
    const clinic = clinicCategories.find((c) => c.id === clinicId);
    if (clinic) {
      setClinicTitle(clinic.name); // Prefill the title
      setClinicToEdit(clinicId);
      setShowEditModal(true);
    }
  };

  // Handle updating the clinic name
  const handleUpdateClinicName = async () => {
    if (clinicToEdit && clinicTitle.trim()) {
      // Check for duplicate clinic name (excluding the clinic being edited)
      const isDuplicate = clinicCategories.some(
        (clinic) =>
          clinic.name.toLowerCase() === clinicTitle.toLowerCase() &&
          clinic.id !== clinicToEdit
      );

      if (isDuplicate) {
        alert(
          "A clinic with this name already exists. Please choose a different name."
        );
        return;
      }

      try {
        const updatedClinic = await ClinicService.updateClinicName(
          clinicToEdit,
          { name: clinicTitle }
        );
        setClinicCategories((prevCategories) =>
          prevCategories.map((clinic) =>
            clinic.id === clinicToEdit
              ? { ...clinic, name: updatedClinic.name }
              : clinic
          )
        );
        setShowEditModal(false);
        setClinicTitle("");
        setClinicToEdit(null);
      } catch (error) {
        console.error("Error updating clinic:", error);
      }
    }
  };

  // Cancel editing and close the modal
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setClinicTitle("");
    setClinicToEdit(null);
  };

  return (
    <DashboardContainer>
      <div className="w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#008FFB] to-[#00C1A7] px-8 py-8 shadow-lg mb-6">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -right-4 bottom-0 h-24 w-24 rounded-full bg-white/10" />
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
                <FaClinicMedical size={22} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Clinic Overview
                </h2>
                <p className="text-white/80 text-sm mt-0.5">
                  {clinicCategories.length} clinic{clinicCategories.length !== 1 ? "s" : ""} registered
                </p>
              </div>
            </div>
            {user?.permissions.includes("clinic:create") && (
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-white text-[#008FFB] font-semibold rounded-lg px-5 py-2.5 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all"
              >
                <FiPlusCircle /> New Clinic
              </button>
            )}
          </div>
        </div>

        {/* Clinic Categories Section */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Clinic Categories</h3>
        {clinicCategories.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 flex flex-col items-center gap-2 text-gray-400">
            <Stethoscope size={32} />
            <p className="text-sm">No clinics registered yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {clinicCategories.map((clinic) => (
              <Link
                key={clinic.id}
                to={`/admin/clinic/${clinic.id}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between hover:shadow-md hover:border-[#008FFB]/30 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${avatarColor(
                      clinic.id + clinic.name
                    )}`}
                  >
                    <Stethoscope size={20} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-800 truncate">{clinic.name}</h4>
                    <p className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                      <Users size={13} />
                      {clinic.count} patients
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {/* Edit Icon */}
                  {user?.permissions.includes("clinic:edit") && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleEditClick(clinic.id);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-[#008FFB] hover:bg-[#008FFB]/10 transition-colors"
                    >
                      <FiEdit />
                    </button>
                  )}
                  {/* Delete Icon */}
                  {user?.permissions.includes("clinic:delete") && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteClick(clinic.id);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <FaTrash size={14} />
                    </button>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Modal for Creating New Clinic */}
        {showModal && (
          <Modal
            isOpen={showModal}
            handleClose={() => setShowModal(false)}
            title="Add Clinic"
          >
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Clinic Name
              </label>
              <input
                type="text"
                placeholder="Enter clinic name"
                value={clinicTitle}
                onChange={(e) => setClinicTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#008FFB]/30 focus:border-[#008FFB] outline-none transition-all mb-4"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleCreateClinic}
                  className="bg-[#008FFB] text-white font-semibold px-5 py-2 rounded-lg hover:bg-[#006fbb] transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Confirmation Modal for Deleting Clinic */}
        {showConfirmDeleteModal && (
          <Modal
            isOpen={showConfirmDeleteModal}
            handleClose={handleCancelDelete}
            title="Confirm Deletion"
          >
            <div className="p-6">
              <p className="text-gray-600 mb-5">
                Are you sure you want to delete this clinic? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="bg-rose-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Modal for Editing Clinic Name */}
        {showEditModal && (
          <Modal
            isOpen={showEditModal}
            handleClose={handleCancelEdit}
            title="Edit Clinic Name"
          >
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Clinic Name
              </label>
              <input
                type="text"
                placeholder="Enter new clinic name"
                value={clinicTitle}
                onChange={(e) => setClinicTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#008FFB]/30 focus:border-[#008FFB] outline-none transition-all mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateClinicName}
                  className="bg-[#008FFB] text-white font-semibold px-5 py-2 rounded-lg hover:bg-[#006fbb] transition-colors"
                >
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

export default ClinicOverviewPage;
