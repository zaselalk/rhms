
import { Link } from "react-router";



const residents = [
  { id: "STF001", name: "Dr. Ravindu Harshana", contact: "0711287298", profilePic: "/avatars/1.jpg" },
  { id: "STF002", name: "Jane Smith", contact: "0723456789", profilePic: "/avatars/2.jpg" },
  { id: "STF003", name: "John Doe", contact: "0756781234", profilePic: "/avatars/3.jpg" },
  { id: "STF004", name: "Sara Connor", contact: "0778901234", profilePic: "/avatars/4.jpg" },
];

const ResidentListPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Resident Details</h2>

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
            {residents.map((resident) => (
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
                 <Link to={`/resident/profile/${resident.id}`}className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-purple-700 transition">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResidentListPage;
