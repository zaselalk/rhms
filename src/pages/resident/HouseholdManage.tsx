import { FC } from "react";
import { useState } from "react";
import AdminSlidebar from "../../components/layouts/admin/AdminSlidebar";
import { Modal, Select, message } from "antd";

const HouseholdPage: FC = () => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [residents, setResidents] = useState([
    { id: "STF001", name: "Dr. Ravindu Harshana" },
    { id: "STF002", name: "Ms. Amanda Perera" },
  ]);

  const [selectedResident, setSelectedResident] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const deleteOptions = ["Moved Out", "Deceased", "Duplicate Entry", "Other"];

  const handleAddResident = () => {
    setAddModalVisible(true);
  };

  const handleDeleteResident = (resident: { id: string; name: string }) => {
    setSelectedResident(resident);
    setDeleteModalVisible(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!selectedResident) return;

    // Show confirmation alert
    const confirmDelete = window.confirm(
      `Are you sure you want to remove ${selectedResident.name}?`
    );

    if (confirmDelete) {
      try {
        // Call API to delete from database
        await fetch(`/api/residents/${selectedResident.id}`, {
          method: "DELETE",
        });

        // Update UI by removing resident from state
        setResidents(
          residents.filter((resident) => resident.id !== selectedResident.id)
        );

        // Show success message
        message.success("Resident removed successfully!");
      } catch (error) {
        message.error("Error removing resident. Please try again.");
      }
    }

    setDeleteModalVisible(false);
  };

  const handleConfirmAdd = () => {
    window.confirm(`Are you sure you want to Add a resident ?`);
    try {
      message.success("Please fill the form to Add Resident !");
    } catch (error) {
      message.error("Error Adding resident. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Reusable Sidebar */}
      <AdminSlidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold text-[#008FFB]">
          Household Resident Manage
        </h2>
        <div className="flex justify-between items-center mb-6">
          <button
            className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
            onClick={handleAddResident}
          >
            + Add Resident
          </button>
        </div>

        {/* Household Stats */}
        <div className="flex mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md mr-4 flex-1 text-center">
            <p className="text-lg font-semibold text-gray-800">8</p>
            <p className="text-sm text-gray-600">Houses</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex-1 text-center">
            <p className="text-lg font-semibold text-gray-800">8</p>
            <p className="text-sm text-gray-600">Total Residents</p>
          </div>
        </div>

        {/* Residents List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="text-left px-4 py-2 text-sm text-gray-600">
                  ID
                </th>
                <th className="text-left px-4 py-2 text-sm text-gray-600">
                  Name
                </th>
                <th className="text-left px-4 py-2 text-sm text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {residents.map((resident) => (
                <tr key={resident.id}>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    #{resident.id}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {resident.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteResident(resident)}
                    >
                      {" "}
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        <Modal
          title="Confirm Removal"
          visible={isDeleteModalVisible}
          onCancel={() => setDeleteModalVisible(false)}
          footer={[
            <button
              key="no"
              className="px-4 py-2 bg-gray-300 rounded-lg"
              onClick={() => setDeleteModalVisible(false)}
            >
              No
            </button>,
            <button
              key="yes"
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={handleConfirmDelete}
            >
              Yes
            </button>,
          ]}
        >
          <p className="text-lg">
            Are you sure you want to remove this resident?
          </p>

          <p>Please select a reason for removal:</p>
          <Select
            className="w-full mt-2"
            placeholder="Select a reason"
            onChange={(value) => setDeleteReason(value)}
          >
            {deleteOptions.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
          {deleteReason === "Other" && (
            <input
              type="text"
              placeholder="Enter reason"
              className="mt-2 w-full p-2 border rounded"
            />
          )}
          <div className="flex justify-end mt-4">
            <button
              className="mr-2 px-4 py-2 bg-gray-300 rounded-lg"
              onClick={() => setDeleteModalVisible(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={handleConfirmDelete}
            >
              Submit
            </button>
          </div>
        </Modal>

        {/* Add Resident Modal */}
        <Modal
          title="Confirm Addition"
          visible={isAddModalVisible}
          onCancel={() => setAddModalVisible(false)}
          footer={null}
        >
          <p>Please select a reason for adding a new resident:</p>
          <Select className="w-full mt-2" placeholder="Select a reason">
            {deleteOptions.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
          {deleteReason === "Other" && (
            <input
              type="text"
              placeholder="Enter reason"
              className="mt-2 w-full p-2 border rounded"
            />
          )}
          <div className="flex justify-end mt-4">
            <button
              className="mr-2 px-4 py-2 bg-gray-300 rounded-lg"
              onClick={() => setAddModalVisible(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={handleConfirmAdd}
            >
              Submit
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default HouseholdPage;
