import { Link } from "react-router";
import { useEffect, useState } from "react";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import residentService from "../../services/resident.service";
import { Pagination } from "antd";

const ResidentListPage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [residents2, setResidents] = useState<
    {
      id: string;
      firstName: string;
      lastName: string;
      contactNumber: String;
      address: string;
    }[]
  >([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;


  const residentRegister = residentService;

  // Fetch residents data from the server
  const fetchResidents = async () => {
    try {
      const data = await residentRegister.getResidentOverview();
      setResidents(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching residents:", error);
    }
  };

  // Fetch data when loading the component
  useEffect(() => {
    fetchResidents();
  }, []);

  return (
    <DashboardContainer>
      <div className="w-full mt-0">
        <div className="sticky top-0 bg-white p-0  mt-0">
          {/* Add Resident Button (Right-Aligned) */}
          <div className="flex justify-between mb-2 items-center">
            <h2 className="text-2xl font-semibold text-[#008FFB] ">Resident Details</h2>
            <Link to="create">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                Add Resident
              </button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex justify-between items-center mb-6  gap-5">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Resident"
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#002dc1] focus:border-[#2b2c8a] outline-none"
            />
          </div>
        </div>

        {/* Resident Details Section */}
        {/* <div className="bg-white shadow-lg rounded-lg p-4 mt-5 sticky ">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-center sticky">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Address</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {residents2
                .filter((resident) => {
                  const fullName = `${resident.firstName} ${resident.lastName}`;
                  return (
                    fullName
                      .toLowerCase()
                      .includes(searchKeyword.toLowerCase()) ||
                    resident.id.toString().includes(searchKeyword)
                  );
                })
                .map((resident) => (
                  <tr
                    key={resident.id}
                    className=" hover:bg-gray-100 text-center"
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
        </div> */}

        <div className="bg-white shadow-lg rounded-lg mt-5">
          {/* Scrollable Table */}
          <div className="h-600 overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-white z-10 shadow">
                <tr className="text-center">
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {residents2
                  .filter((resident) => {
                    const fullName = `${resident.firstName} ${resident.lastName}`;
                    return (
                      fullName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                      resident.id.toString().includes(searchKeyword)

                    );
                  })
                  .map((resident) => (
                    <tr key={resident.id} className="text-center hover:bg-gray-100">
                      <td className="p-3">{resident.id}</td>
                      <td className="p-3">{resident.firstName} {resident.lastName}</td>
                      <td className="p-3">{resident.contactNumber}</td>
                      <td className="p-3">{resident.address}</td>
                      <td className="p-3">
                        <Link to={`profile/${resident.id}`} className="text-blue-600">View</Link>
                      </td>
                    </tr>
                  ))}



              </tbody>
            </table>
          </div>
        </div>


      </div>
      <div className="flex justify-center mt-4">

        <Pagination align="center" defaultCurrent={1} total={50} />
      </ div>
    </DashboardContainer>
  );
};

export default ResidentListPage;
