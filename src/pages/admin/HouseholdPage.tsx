import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Modal, message, Button, Input } from "antd";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { HouseholdCreateModal } from "../../components/features/household-management/HouseholdCreateModal";
import { deleteHousehold } from "../../services/household.service";

const HouseholdPage: FC = () => {
  const navigate = useNavigate();

  //   const [newOwner, setNewOwner] = useState("");
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedHousehold, setSelectedHousehold] = useState<any>(null);
  const [newOwnerId, setNewOwnerId] = useState("");
  const [newOwnerName, setNewOwnerName] = useState("");
  const [deleteReason, setDeleteReason] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [registeredHouseholds, setRegisteredHouseholds] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [residentCount, setResidentCount] = useState(0);
  const [householdChartData, setHouseholdChartData] = useState<
    { division: string; count: number }[]
  >([]);

  // const householdData = [
  //   { division: "Kotagedara", count: 10 },
  //   { division: "Navuththuduwa", count: 15 },
  //   { division: "Bopitiya", count: 8 },
  //   { division: "Maddegedara", count: 5 },
  //   { division: "Pahalawela", count: 12 },
  //   { division: "Kolahekada", count: 7 },
  //   { division: "Narawila", count: 9 },
  //   { division: "Yatadola", count: 11 },
  //   { division: "Henpita", count: 6 },
  //   { division: "Pallegoda", count: 13 },
  // ];

  useEffect(() => {
    const fetchHouseholds = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/household/read",
        );
        setRegisteredHouseholds(response.data);

        // Compute counts per division
        const divisionCounts: Record<string, number> = {};
        response.data.forEach((household: any) => {
          const division = household.grama_division || "Unknown";
          divisionCounts[division] = (divisionCounts[division] || 0) + 1;
        });

        // Transform to array suitable for BarChart
        const chartData = Object.entries(divisionCounts).map(
          ([division, count]) => ({
            division,
            count,
          }),
        );

        setHouseholdChartData(chartData);
      } catch (error) {
        console.error("Error fetching households:", error);
        message.error("Failed to load households");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHouseholds();
  }, []);

  //get the total number of registered residents
  useEffect(() => {
    const fetchResidentCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/resident/residentCount",
        );
        setResidentCount(response.data.data.count);
      } catch (error) {
        console.error("Error fetching resident count:", error);
        message.error("Failed to load resident count");
      }
    };
    fetchResidentCount();
  }, []);

  const handleViewHousehold = (householdId: string) => {
    navigate(`/admin/households/manage/${householdId}`);
  };

  const handleDeleteHousehold = (household: any) => {
    setSelectedHousehold(household);
    setDeleteModalVisible(true);
  };

  const confirmDeleteHousehold = async () => {
    if (!selectedHousehold) return;
    try {
      // Call the deleteHousehold method to delete the selected household
      await deleteHousehold(selectedHousehold.house_no);
      setRegisteredHouseholds((prev) =>
        prev.filter(
          (household) => household.house_no !== selectedHousehold.house_no,
        ),
      );
      message.success("Household deleted successfully!");
      setDeleteModalVisible(false);
      setSelectedHousehold(null);
      setDeleteReason("");
    } catch (error) {
      message.error("Failed to delete household");
    }
  };

  const handleEditHousehold = (household: any) => {
    setSelectedHousehold(household);
    setNewOwnerName(`${household.owner.firstName} ${household.owner.lastName}`);
    setEditModalVisible(true);
  };

  const handleSearchResident = async () => {
    if (!newOwnerId) return message.error("Please enter a valid Resident ID!");
    try {
      const response = await axios.get(
        `http://localhost:3001/resident/id/${newOwnerId}`,
      );
      if (response.data?.data) {
        setNewOwnerName(
          `${response.data.data.firstName} ${response.data.data.lastName}`,
        );
        message.success("Resident found");
      } else {
        message.error("Resident not found");
        setNewOwnerName(""); // Clear name if not found
      }
    } catch (error) {
      console.error("Error searching resident:", error);
      message.error("Failed to search resident");
    }
  };

  const handleConfirmEdit = async () => {
    if (!newOwnerId) {
      return message.error("Please enter a valid resident ID!");
    }
    if (!selectedHousehold || !selectedHousehold.owner) {
      return message.error("Invalid household or owner selected!");
    }

    try {
      // Make the API request to update the household owner
      const response = await axios.put(
        `http://localhost:3001/household/update/${selectedHousehold.house_no}`,
        { owner_id: newOwnerId },
      );

      if (response.status === 200 && response.data.owner) {
        setRegisteredHouseholds((prev) =>
          prev.map((household) =>
            household.house_no === selectedHousehold.house_no
              ? { ...household, owner: response.data.owner }
              : household,
          ),
        );

        message.success("Household owner updated successfully!");
        setEditModalVisible(false);
        console.log("Updated household:", response.data);
      } else {
        message.error("Failed to update owner");
      }
    } catch (error: any) {
      console.error("Error updating household owner:", error);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Failed to update household owner");
      }
    }
  };

  if (isLoading) return <div>Loading households...</div>;

  return (
    <DashboardContainer>
      <HouseholdCreateModal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#008FFB]">
            Household Management
          </h2>
          <Button
            className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
            onClick={() => setIsOpen(true)}
          >
            + Add Household
          </Button>
        </div>

        <div className="flex mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md mr-4 flex-1 text-center">
            <p className="text-lg font-semibold text-gray-800">
              {registeredHouseholds.length}
            </p>
            <p className="text-sm text-gray-600">Total Households</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex-1 text-center">
            <p className="text-lg font-semibold text-gray-800">
              {residentCount}
            </p>
            <p className="text-sm text-gray-600">Total Residents</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Households Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={householdChartData}>
              <XAxis dataKey="division" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#008FFB" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="text-left px-4 py-2 text-sm text-gray-600">
                  House No
                </th>
                <th className="text-left px-4 py-2 text-sm text-gray-600">
                  Owner
                </th>
                <th className="text-left px-4 py-2 text-sm text-gray-600">
                  Division
                </th>
                <th className="text-left px-4 py-2 text-sm text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {registeredHouseholds.map((household) => (
                <tr key={household.id}>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {household.house_no}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">{`${household.owner.firstName} ${household.owner.lastName}`}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {household.grama_division}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <div className="flex space-x-2">
                      <button
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
                        onClick={() => handleViewHousehold(household.id)}
                      >
                        <span className="mr-2">View</span>
                        <EyeOutlined />
                      </button>
                      <button
                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600"
                        onClick={() => handleEditHousehold(household)}
                      >
                        <span className="mr-2">Edit</span>
                        <EditOutlined />
                      </button>
                      <button
                        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600"
                        onClick={() => handleDeleteHousehold(household)}
                      >
                        <span className="mr-2">Delete</span>
                        <DeleteOutlined />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        title="Delete Household"
        visible={isDeleteModalVisible}
        onOk={confirmDeleteHousehold}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete the household{" "}
          <strong>{selectedHousehold?.house_no}</strong>?
        </p>
        <Input
          type="text"
          placeholder="Reason for deletion"
          value={deleteReason}
          onChange={(e) => setDeleteReason(e.target.value)}
        />
      </Modal>

      <Modal
        title="Edit Household Owner"
        visible={isEditModalVisible}
        onOk={handleConfirmEdit}
        onCancel={() => setEditModalVisible(false)}
        okText="Confirm"
        cancelText="Cancel"
      >
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
            New Owner ID
          </label>
          <Input
            value={newOwnerId}
            onChange={(e) => setNewOwnerId(e.target.value)}
            onBlur={handleSearchResident}
            placeholder="Enter new owner's Resident ID"
          />
          <Button onClick={handleSearchResident} type="primary">
            Search
          </Button>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
            New Owner Name
          </label>
          <Input value={newOwnerName} />
        </div>
      </Modal>
    </DashboardContainer>
  );
};

export default HouseholdPage;
