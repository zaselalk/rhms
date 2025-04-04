import React, { useState } from "react";
import { FaClinicMedical, FaTrash } from "react-icons/fa";
import { FiPlusCircle, FiEdit } from "react-icons/fi"; // Import the edit icon
import Modal from "../../components/layouts/overlays/Modal"; // Ensure Modal is correctly imported
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer"; // Ensure DashboardContainer is correctly imported
import { Link } from "react-router";
// Ensure AdminNavbar is correctly imported

const ClinicOverview: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [clinicTitle, setClinicTitle] = useState("");
  const [clinicCategories, setClinicCategories] = useState([
    { id: "clinic1", name: "Diabetic", count: 291, change: "10%", increase: true },
    { id: "clinic2", name: "Hypo lipid", count: 34, change: "10%", increase: false },
    { id: "clinic3", name: "Asthma", count: 45, change: "10%", increase: false },
  ]);
  const [clinicToDelete, setClinicToDelete] = useState<string | null>(null);
  const [clinicToEdit, setClinicToEdit] = useState<string | null>(null);

  // Handle creating a new clinic
  const handleCreateClinic = () => {
    if (clinicTitle.trim()) {
      const newClinic = {
        id: `clinic${clinicCategories.length + 1}`, 
        name: clinicTitle,
        count: 0,
        change: "0%",
        increase: false,
      };
      setClinicCategories([...clinicCategories, newClinic]); // Add new clinic to the list
      setShowModal(false);
      setClinicTitle(""); // Reset the input field
    }
  };

  // Handle deleting a clinic (show confirmation modal)
  const handleDeleteClick = (clinicId: string) => {
    setClinicToDelete(clinicId); // Set the clinic id to be deleted
    setShowConfirmDeleteModal(true); // Show the confirmation modal
  };

  // Confirm deletion of the clinic
  const handleConfirmDelete = () => {
    if (clinicToDelete) {
      setClinicCategories((prevCategories) =>
        prevCategories.filter((clinic) => clinic.id !== clinicToDelete)
      );
    }
    setShowConfirmDeleteModal(false); // Close the confirmation modal
    setClinicToDelete(null); // Clear the clinic to delete
  };

  // Cancel deletion and close the modal
  const handleCancelDelete = () => {
    setShowConfirmDeleteModal(false);
    setClinicToDelete(null); // Clear the clinic to delete
  };

  // Handle editing a clinic's name
  const handleEditClick = (clinicId: string) => {
    setClinicToEdit(clinicId); // Set the clinic id to be edited
    setShowEditModal(true); // Show the edit modal
  };

  // Handle updating the clinic name
  const handleUpdateClinicName = () => {
    if (clinicToEdit && clinicTitle.trim()) {
      setClinicCategories((prevCategories) =>
        prevCategories.map((clinic) =>
          clinic.id === clinicToEdit ? { ...clinic, name: clinicTitle } : clinic
        )
      );
      setShowEditModal(false); // Close the edit modal
      setClinicTitle(""); // Reset the input field
      setClinicToEdit(null); // Clear the clinic to edit
    }
  };

  // Cancel editing and close the modal
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setClinicTitle(""); // Reset the input field
    setClinicToEdit(null); // Clear the clinic to edit
  };

  return (
    <DashboardContainer>
      {/* Main Content */}
      <div className="p-6 w-full min-h-screen">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 shadow rounded-lg">
          <div className="flex items-center space-x-3">
            <FaClinicMedical className="text-blue-600 text-3xl" />
            <div>
              <h2 className="text-lg font-bold">Clinic Overview</h2>
              <p className="text-gray-500 text-sm">Total Clinics: {clinicCategories.length}</p>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 flex items-center rounded-lg shadow hover:bg-blue-600 transition"
          >
            <FiPlusCircle className="mr-2" /> New Clinic
          </button>
        </div>

        {/* Clinic Categories Section */}
        <h3 className="text-xl font-semibold mb-4">Clinic Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clinicCategories.map((clinic) => (
            <Link
              key={clinic.id}
              to={`/admin/clinic/${clinic.name.toLowerCase().replace(/\s+/g, "-")}`} // Dynamic link based on clinic name
              className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center cursor-pointer hover:shadow-lg transition"
            >
              <div>
                <h4 className="text-lg font-semibold">{clinic.name}</h4>
                <p className="text-2xl font-bold">{clinic.count}</p>
                <p className="text-gray-500 text-sm">Last month</p>
                <p
                  className={`text-sm font-semibold ${clinic.increase ? "text-green-500" : "text-red-500"}`}
                >
                  {clinic.change} {clinic.increase ? "▲" : "▼"}
                </p>
              </div>
              <div className="flex space-x-2">
                {/* Edit Icon */}
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent Link navigation on edit click
                    handleEditClick(clinic.id);
                  }}
                  className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                >
                  <FiEdit className="text-lg" /> {/* Edit icon */}
                </button>
                {/* Delete Icon */}
                <FaTrash
                  className="text-gray-500 cursor-pointer hover:text-red-600 transition"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent Link navigation on delete click
                    handleDeleteClick(clinic.id);
                  }}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Modal for Creating New Clinic */}
        {showModal && (
          <Modal isOpen={showModal} handleClose={() => setShowModal(false)} title="Add Clinic">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-4">Add Clinic</h2>
              <input
                type="text"
                placeholder="Title"
                value={clinicTitle}
                onChange={(e) => setClinicTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleCreateClinic}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Create
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Confirmation Modal for Deleting Clinic */}
        {showConfirmDeleteModal && (
          <Modal isOpen={showConfirmDeleteModal} handleClose={handleCancelDelete} title="Confirm Deletion">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-4">Are you sure you want to delete this clinic?</h2>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCancelDelete}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Modal for Editing Clinic Name */}
        {showEditModal && (
          <Modal isOpen={showEditModal} handleClose={handleCancelEdit} title="">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-4">Edit Clinic Name</h2>
              <input
                type="text"
                placeholder="New Clinic Name"
                value={clinicTitle}
                onChange={(e) => setClinicTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleUpdateClinicName}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </DashboardContainer>
  );
};

export default ClinicOverview;
