
import { Link } from "react-router";
import AdminSidebar from "../../components/layouts/admin/AdminSlidebar";
import { useState } from "react";
import { AdminNavbar } from "../../components/layouts/admin/AdminNavbar";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";

const residents = [
  { id: "STF001", name: "ravindu Harshana", contact: "0711287298", profilePic: "/avatars/1.jpg" },
  { id: "STF002", name: "Jane Smith", contact: "0723456789", profilePic: "/avatars/2.jpg" },
  { id: "STF003", name: "John Doe", contact: "0756781234", profilePic: "/avatars/3.jpg" },
  { id: "STF004", name: "Sara Connor", contact: "0778901234", profilePic: "/avatars/4.jpg" },
];

const ResidentListPage = () => {
  const [seachkeyword, setSeacrhKeyword] = useState("");

  return (

    <DashboardContainer>
      <div className="w-full bg-gray-100 ">
        <AdminNavbar />
        {/* Header Section */}
        {/* <div className="flex justify-between items-center mb-6 bg-white p-4 shadow rounded-lg">
        <div className="flex items-center space-x-3"> */}

        <div className="flex justify-between items-center mb-6 pl-5 pr-5 gap-5" >

          <input type="text" name="search" id="search"
            placeholder="Search Resident"
            //  value={seachkeyword}
            onChange={(e) => setSeacrhKeyword(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
          />
          <button>Seach</button>
        </div>

        <div>
          <h2 className="text-lg font-bold">Resident Details</h2>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">Profile</th>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {residents.filter((item) => {
                if (seachkeyword === "") {
                  return item;
                } else if (item.name.toLowerCase().includes(seachkeyword.toLowerCase())) {
                  return item;
                } else if (item.id.toLowerCase().includes(seachkeyword.toLowerCase())) {
                  return item;
                } else if (item.contact.toLowerCase().includes(seachkeyword.toLowerCase())) {
                  return item;
                }

              }).map((resident) => (
                <tr key={resident.id} className="border-b">
                  <td className="p-3">
                    <img src={resident.profilePic} alt="Profile" className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="p-3">{resident.id}</td>
                  <td className="p-3">{resident.name}</td>
                  <td className="p-3">{resident.contact}</td>
                  <td className="p-3">
                    {/* <Link to={`/resident/profile/${resident.id}`}>
                    <Button className="bg-blue-500 text-white px-4 py-2 rounded">VIEW</Button>
                  </Link> */}
                    <Link to={`profile/${resident.id}`} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-purple-700 transition">
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
    // </div>
    // </div>
  );
};

export default ResidentListPage;
