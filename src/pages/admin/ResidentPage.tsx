import { Link } from "react-router";
import { useEffect, useState } from "react";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import residentService from "../../services/resident.service";
import { Pagination } from "antd";

const ResidentPage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
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
  const pageSize = 15;

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
      <div className="w-full mt-0">
        {/* Header & Search */}
        <div className="top-0 bg-white z-20 pb-2">
          <div className="flex justify-between mb-2 items-center">
            <h2 className="text-2xl font-semibold text-[#008FFB]">
              Resident Details
            </h2>
            <Link to="create">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                Add Resident
              </button>
            </Link>
          </div>
          <div className="flex justify-between items-center mb-4 gap-5">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Resident"
              onChange={(e) => {
                setSearchKeyword(e.target.value);
                setCurrentPage(1); // reset to page 1 on search
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#002dc1] focus:border-[#2b2c8a] outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-lg rounded-lg mt-5">
          <div className="max-h-[600px] overflow-y-auto">
            <table className="w-full border-collapse sticky">
              <thead className=" bg-white mt-20 z-10 shadow sticky">
                <tr className="text-center sticky top-0 bg-white">
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedResidents.map((resident) => (
                  <tr
                    key={resident.id}
                    className="text-center hover:bg-gray-100"
                  >
                    <td className="p-3">{resident.id}</td>
                    <td className="p-3">
                      {resident.firstName} {resident.lastName}
                    </td>
                    <td className="p-3">{resident.contactNumber}</td>
                    <td className="p-3">{resident.address}</td>
                    <td className="p-3">
                      <Link
                        to={`profile/${resident.id}`}
                        className="text-blue-600"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
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
