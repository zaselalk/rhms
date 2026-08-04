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
import { BarChart3, MapPin } from "lucide-react";

import {
  deleteHousehold,
  fetchAllHouseholds,
  fetchResidentCount,
  updateHouseholdOwner,
} from "../../services/household.service";
import householdresidentService from "../../services/householdresident.service";
import residentService from "../../services/resident.service";
import { useAppSelector } from "../../hooks/state/hooks";

const getInitials = (firstName?: string, lastName?: string) => {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase() || "?";
};

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
      render: (house_no: string) => (
        <span className="font-medium text-gray-800">{house_no}</span>
      ),
    },
    {
      title: "Owner",
      key: "owner",
      render: (_: any, record: any) => {
        const firstName = record.owner?.firstName || "";
        const lastName = record.owner?.lastName || "";
        return (
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${avatarColor(
                record.id + firstName
              )}`}
            >
              {getInitials(firstName, lastName)}
            </div>
            <span className="text-gray-700">
              {firstName || lastName ? `${firstName} ${lastName}` : "N/A"}
            </span>
          </div>
        );
      },
    },
    {
      title: "Division",
      dataIndex: "grama_division",
      key: "grama_division",
      render: (division: string) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
          <MapPin size={12} />
          {division}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-[#008FFB] hover:bg-[#008FFB]/10 rounded-lg font-medium text-sm transition-colors"
            onClick={() => handleViewHousehold(record.id)}
          >
            <EyeOutlined />
            View
          </button>
          {/* Only who has edit permission can see this button */}
          {user?.permissions?.includes("household:edit") && (
            <button
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg font-medium text-sm transition-colors"
              onClick={() => handleEditHousehold(record)}
            >
              <EditOutlined />
              Edit
            </button>
          )}
          {/* Only who has delete permission can see this button */}
          {user?.permissions?.includes("household:delete") && (
            <button
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg font-medium text-sm transition-colors"
              onClick={() => handleDeleteHousehold(record)}
            >
              <DeleteOutlined />
              Delete
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DashboardContainer>
      <div className="flex-1 max-w-7xl mx-auto">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Total Households
                  </p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-1">
                    {registeredHouseholds.length}
                  </h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#008FFB]/10 text-[#008FFB] text-2xl">
                  <HomeOutlined />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Total Residents
                  </p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-1">
                    {residentCount}
                  </h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500 text-2xl">
                  <TeamOutlined />
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
              <Input.Search
                placeholder="Search by House Number"
                allowClear
                enterButton
                size="large"
                onSearch={(value) => setSearchText(value)}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
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

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 size={20} className="text-[#008FFB]" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Households Distribution by Division
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={householdChartData}>
                  <XAxis dataKey="division" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: "#f3f4f6" }}
                    contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                  />
                  <Bar dataKey="count" fill="#008FFB" radius={[6, 6, 0, 0]} maxBarSize={48} />
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
