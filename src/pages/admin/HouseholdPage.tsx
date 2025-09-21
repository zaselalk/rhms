// src/pages/admin/HouseholdPage.tsx

import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Modal, message, Button, Input, Table, Spin } from "antd";
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
import { HomeOutlined, TeamOutlined, PlusOutlined } from "@ant-design/icons";

import {
  deleteHousehold,
  fetchAllHouseholds,
  fetchResidentCount,
  updateHouseholdOwner,
} from "../../services/household.service";
import householdresidentService from "../../services/householdresident.service";
import residentService from "../../services/resident.service";
import { useAppSelector } from "../../hooks/state/hooks";


const HouseholdPage: FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedHousehold, setSelectedHousehold] = useState<any>(null);
  const [newOwnerId, setNewOwnerId] = useState("");
  const [newOwnerName, setNewOwnerName] = useState("");
  const [deleteReason, setDeleteReason] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [registeredHouseholds, setRegisteredHouseholds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [residentCount, setResidentCount] = useState(0);
  const [householdChartData, setHouseholdChartData] = useState<
    { division: string; count: number }[]
  >([]);
  const [searchText, setSearchText] = useState("");

  console.log(deleteReason);

  const fetchHouseholds = async () => {
    try {
      setLoading(true);

      const data = await fetchAllHouseholds();
      setRegisteredHouseholds(data);

      const divisionCounts: Record<string, number> = {};
      data.forEach((household: any) => {
        const division = household.grama_division || "Unknown";
        divisionCounts[division] = (divisionCounts[division] || 0) + 1;
      });

      const chartData = Object.entries(divisionCounts).map(
        ([division, count]) => ({
          division,
          count,
        })
      );
      setHouseholdChartData(chartData);
    } catch (error) {
      console.error("Error fetching households:", error);
      message.error("Failed to load households");
    } finally {
      setLoading(false);
    }
  };

  const fetchResidentCountHandler = async () => {
    try {
      const count = await fetchResidentCount();
      setResidentCount(count);
    } catch (error) {
      console.error("Error fetching resident count:", error);
      message.error("Failed to load resident count");
    }
  };

  useEffect(() => {
    fetchHouseholds();
  }, []);

  useEffect(() => {
    fetchResidentCountHandler();
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
      await deleteHousehold(selectedHousehold.id);
      setRegisteredHouseholds((prev) =>
        prev.filter((household) => household.id !== selectedHousehold.id)
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

    const input = newOwnerId.trim();

    const isNumericId = /^\d+$/.test(input); // Digits only
    const isValidNIC = /^(\d{9}[vVxX]|\d{12})$/.test(input); // NIC format

    if (!isNumericId && !isValidNIC) {
      message.error("Invalid Resident ID or NIC format!");
      setNewOwnerName("");
      return;
    }

    try {
      let resident;
      if (isNumericId) {
        const response = await residentService.getSingleResident(input);

      resident = response.data;

      } else {
       const response = await residentService.searchResidentByNic(input);
      resident = response.data;
       

      }

      if (resident) {
        setNewOwnerName(`${resident.firstName} ${resident.lastName}`);
        setNewOwnerId(resident.id.toString()); // Store numeric ID for update
        message.success("Resident found");
      } else {
        setNewOwnerName("");
        message.error("Resident not found");
      }
    } catch (error) {
      console.error("Error searching resident:", error);
      setNewOwnerName("");
      message.error("Failed to search resident");
    }
  };

  const handleConfirmEdit = async () => {
    if (!newOwnerId) return message.error("Please enter a valid resident ID!");
    if (!selectedHousehold || !selectedHousehold.owner)
      return message.error("Invalid household or owner selected!");

    try {
      console.log("Calling updateOwnerResident...");
      await householdresidentService.updateOwnerResident(
        selectedHousehold.id,
        parseInt(newOwnerId)
      );

      console.log("Calling updateHouseholdOwner...");
      const updatedHousehold = await updateHouseholdOwner(
        selectedHousehold.id,
        newOwnerId
      );

      setRegisteredHouseholds((prev) =>
        prev.map((household) =>
          household.id === selectedHousehold.id
            ? { ...household, owner: updatedHousehold.owner }
            : household
        )
      );

      message.success("Household owner updated successfully!");
      setEditModalVisible(false);

      setNewOwnerId("");
      setNewOwnerName("");

      await fetchHouseholds(); // Refresh households after update
      await fetchResidentCountHandler;
    } catch (error: any) {
      console.error("Error updating household owner:", error);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Failed to update household owner");
      }
    }
  };

  const filteredHouseholds = registeredHouseholds.filter((household) =>
    household.house_no.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "House No",
      dataIndex: "house_no",
      key: "house_no",
    },
    {
      title: "Owner",
      key: "owner",
      render: (_: any, record: any) =>
        `${record.owner?.firstName || ""} ${record.owner?.lastName || ""}`,
    },
    {
      title: "Division",
      dataIndex: "grama_division",
      key: "grama_division",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex space-x-2">
          <button
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 cursor-pointer"
            onClick={() => handleViewHousehold(record.id)}
          >
            <span className="mr-2">View</span>
            <EyeOutlined />
          </button>
          {/* Only who has edit permission can see this button */}
          {user?.permissions?.includes("household:edit") && (
            <button
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 cursor-pointer"
              onClick={() => handleEditHousehold(record)}
            >
              <span className="mr-2">Edit</span>
              <EditOutlined />
            </button>
          )}
          {/* Only who has delete permission can see this button */}
          {user?.permissions?.includes("household:delete") && (
            <button
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 cursor-pointer"
              onClick={() => handleDeleteHousehold(record)}
            >
              <span className="mr-2">Delete</span>
              <DeleteOutlined />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DashboardContainer>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#008FFB]">
            Household Management
          </h2>

          {/* Render only for users with create permission */}
          {user?.permissions?.includes("household:create") && (
            <Button
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-5 py-2 rounded-full shadow-md transition duration-300 ease-in-out"
              type="primary"
              style={{ backgroundColor: "#008FFB" }}
              onClick={() => setIsOpen(true)}
              icon={<PlusOutlined />}
            >
              Add Household
            </Button>
          )}
        </div>

        <HouseholdCreateModal
          isOpen={isOpen}
          handleClose={() => setIsOpen(false)}
          refreshHouseholds={fetchHouseholds}
        />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-2xl shadow-md flex items-center justify-between transition transform hover:scale-105">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Total Households
                  </p>
                  <h3 className="text-3xl font-bold text-blue-800">
                    {registeredHouseholds.length}
                  </h3>
                </div>
                <div className="text-blue-700 text-4xl">
                  <HomeOutlined />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-2xl shadow-md flex items-center justify-between transition transform hover:scale-105">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Total Residents
                  </p>
                  <h3 className="text-3xl font-bold text-green-800">
                    {residentCount}
                  </h3>
                </div>
                <div className="text-green-700 text-4xl">
                  <TeamOutlined />
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
              <Input.Search
                placeholder="Search by House Number"
                allowClear
                enterButton
                size="large"
                onSearch={(value) => setSearchText(value)}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Table
                dataSource={filteredHouseholds}
                columns={columns}
                rowKey="id"
                pagination={{
                  pageSize: 5,
                  position: ["bottomCenter"],
                  className: "custom-pagination",
                }}
              />
            </div>

            <br />

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Households Distribution Statistics
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
          </>
        )}
      </div>

      <Modal
        title="Delete Household"
        visible={isDeleteModalVisible}
        onOk={confirmDeleteHousehold}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true, type: "primary" }}
      >
        <p>
          Are you sure you want to delete the household{" "}
          <strong>{selectedHousehold?.house_no}</strong>?
        </p>
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
            New Owner ID or NIC
          </label>
          <Input
            value={newOwnerId}
            onChange={(e) => {
              const input = e.target.value.toUpperCase();
              if (/^[0-9vV]*$/.test(input)) {
                setNewOwnerId(input);
              } else {
                message.error("Please enter a valid Resident ID!");
              }
            }}
            placeholder="Enter new owner's Resident ID or NIC"
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
