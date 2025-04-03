import { Link } from "react-router";
import { useState } from "react";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";

const residents = [
  { id: "01", name: "Kasun Perera", contact: "0712233445" },
  { id: "02", name: "Tharushi Fernando", contact: "0723344556" },
  { id: "03", name: "Lahiru Jayawardena", contact: "0754455667" },
  { id: "04", name: "Anusha Rajapaksha", contact: "0775566778" },
  { id: "05", name: "Nimal Bandara", contact: "0706677889" },
  { id: "06", name: "Chamari Silva", contact: "0717788990" },
  { id: "07", name: "Dineth Gunawardana", contact: "0728899001" },
  { id: "08", name: "Isuru Rathnayaka", contact: "0759900112" },
  { id: "09", name: "Ruvini Dissanayake", contact: "0770011223" },
  { id: "10", name: "Sanjeewa Wijesinghe", contact: "0701122334" },
];

const ResidentListPage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <DashboardContainer>
      <div className="w-full mt-0">
        <div className="sticky top-0 bg-white shadow-lg z-10 p-4 mb-6 mt-0">

          <div className="mt-0">
            <h2 className="text-2xl font-bold">Resident Details</h2>
          </div>


          {/* Add Resident Button (Right-Aligned) */}
          <div className="flex justify-end mb-6">
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


        <div className="bg-white shadow-lg rounded-lg p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {residents
                .filter((item) => {
                  if (searchKeyword === "") return item;
                  return (
                    item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    item.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    item.contact.toLowerCase().includes(searchKeyword.toLowerCase())
                  );
                })
                .map((resident) => (
                  <tr key={resident.id} className=" hover:bg-gray-100">
                    <td className="p-3">{resident.id}</td>
                    <td className="p-3">{resident.name}</td>
                    <td className="p-3">{resident.contact}</td>
                    <td className="p-3">
                      <Link
                        to={`profile/${resident.id}`}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
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
    </DashboardContainer>
  );
};

export default ResidentListPage;
