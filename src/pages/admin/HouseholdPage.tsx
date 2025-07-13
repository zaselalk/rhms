// src/pages/admin/HouseholdPage.tsx

import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Modal, message, Button, Input, Table } from "antd";
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

import {
  deleteHousehold,
  fetchAllHouseholds,
  fetchResidentCount,
  searchResidentById,
  updateHouseholdOwner,
} from "../../services/household.service";
import householdresidentService from "../../services/householdresident.service";

const HouseholdPage: FC = () => {
  const navigate = useNavigate();

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
  const [householdChartData, setHouseholdChartData] = useState<{ division: string; count: number }[]>([]);
  const [searchText, setSearchText] = useState('');


  const fetchHouseholds = async () => {
    try {
      const data = await fetchAllHouseholds();
      setRegisteredHouseholds(data);

      const divisionCounts: Record<string, number> = {};
      data.forEach((household: any) => {
        const division = household.grama_division || "Unknown";
        divisionCounts[division] = (divisionCounts[division] || 0) + 1;
      });

      const chartData = Object.entries(divisionCounts).map(([division, count]) => ({
        division,
        count,
      }));
      setHouseholdChartData(chartData);
    } catch (error) {
      console.error("Error fetching households:", error);
      message.error("Failed to load households");
    } finally {
      setIsLoading(false);
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
      resident = await searchResidentById(Number(input));
    } else {
      const response = await fetch(`http://localhost:3001/resident/nic/${input}`);
      const result = await response.json();
      if (!result?.data) throw new Error("Resident not found");
      resident = result.data;
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
      console.log("Calling updateHouseholdOwner...");
      const updatedHousehold = await updateHouseholdOwner(
        selectedHousehold.id,
        newOwnerId
      );

      console.log("Calling updateOwnerResident...");
      await householdresidentService.updateOwnerResident(
        selectedHousehold.id,
        parseInt(newOwnerId)
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

        window.location.reload(); // Refresh the page to reflect changes

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
      render: (text: any, record: any) =>
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
          <button
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 cursor-pointer"
            onClick={() => handleEditHousehold(record)}
          >
            <span className="mr-2">Edit</span>
            <EditOutlined />
          </button>
          <button
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 cursor-pointer"
            onClick={() => handleDeleteHousehold(record)}
          >
            <span className="mr-2">Delete</span>
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <div>Loading households...</div>;


  return (
    <DashboardContainer>
      <HouseholdCreateModal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        refreshHouseholds={fetchHouseholds}
      />
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#008FFB]">
            Household Management
          </h2>
          <Button
            className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
            type="primary"
            style={{ backgroundColor: '#008FFB' }}
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
              position: ['bottomCenter'],
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

      </div>

      <Modal
        title="Delete Household"
        visible={isDeleteModalVisible}
        onOk={confirmDeleteHousehold}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true, type: 'primary' }}
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
