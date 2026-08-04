import { Link } from "react-router";
import { useEffect, useState } from "react";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import residentService from "../../services/resident.service";
import { Button, Pagination } from "antd";
import { EyeOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Search, Users, Phone, MapPin } from "lucide-react";
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

const ResidentPage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const user = useAppSelector((state) => state.auth.user);

  const [residents2, setResidents] = useState<
    {
      id: string;
      firstName: string;
      lastName: string;
      contactNumber: string;
      address: string;
    }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const residentRegister = residentService;

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    try {
      const data = await residentRegister.getResidentOverview();
      setResidents(data.data);
    } catch (error) {
      console.error("Error fetching residents:", error);
    }
  };

  //  Filtered resident list
  const filteredResidents = residents2.filter((resident) => {
    const fullName = `${resident.firstName} ${resident.lastName}`;
    return (
      fullName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      resident.id.toString().includes(searchKeyword)
    );
  });

  //  Paginated resident list
  const paginatedResidents = filteredResidents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <DashboardContainer>
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#008FFB]">
            Resident Details
          </h2>

          {user?.permissions.includes("resident:create") && (
            <Link to="create">
              <Button
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-5 py-2 rounded-full shadow-md transition duration-300 ease-in-out"
                type="primary"
                style={{ backgroundColor: "#008FFB" }}
                icon={<UsergroupAddOutlined />}
              >
                Add Resident
              </Button>
            </Link>
          )}
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search by name or resident ID..."
              onChange={(e) => {
                setSearchKeyword(e.target.value);
                setCurrentPage(1); // reset to page 1 on search
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#008FFB]/30 focus:border-[#008FFB] outline-none transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="sticky top-0 bg-gray-50 z-10 border-b border-gray-100">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">ID</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Name</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Contact</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Address</th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedResidents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <Users size={32} />
                        <p className="text-sm">No residents found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedResidents.map((resident) => (
                    <tr
                      key={resident.id}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-3.5 text-sm text-gray-500">#{resident.id}</td>
                      <td className="px-5 py-3.5">
                        {user?.permissions.includes("clinic:view") ? (
                          <Link
                            to={`profile/${resident.id}`}
                            className="flex items-center gap-3 group w-fit"
                          >
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${avatarColor(
                                resident.id + resident.firstName
                              )}`}
                            >
                              {getInitials(resident.firstName, resident.lastName)}
                            </div>
                            <span className="font-medium text-gray-800 group-hover:text-[#008FFB] transition-colors">
                              {resident.firstName} {resident.lastName}
                            </span>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${avatarColor(
                                resident.id + resident.firstName
                              )}`}
                            >
                              {getInitials(resident.firstName, resident.lastName)}
                            </div>
                            <span className="font-medium text-gray-800">
                              {resident.firstName} {resident.lastName}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Phone size={13} className="text-gray-400" />
                          {resident.contactNumber || "N/A"}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 max-w-xs truncate">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-gray-400 shrink-0" />
                          <span className="truncate">{resident.address || "N/A"}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {user?.permissions.includes("clinic:view") && (
                          <Link
                            to={`profile/${resident.id}`}
                            className="inline-flex items-center gap-1.5 text-[#008FFB] hover:text-[#00C1A7] font-medium text-sm transition-colors"
                          >
                            <EyeOutlined />
                            View
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredResidents.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </div>
    </DashboardContainer>
  );
};

export default ResidentPage;
