
import { useParams, Link } from "react-router";


const resident = { id: "STF001", name: "Dr. Ravindu Harshana", age: 45, bloodGroup: "O+", contact: "0711287298", division: "Katugahahena", profilePic: "/avatars/1.jpg" }

const ResidentDashboard = () => {
  // const { id } = useParams();


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Resident Dashboard</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 flex">
        <img src={resident.profilePic} alt="Profile" className="w-24 h-24 rounded-full mr-6" />
        <div>
          <h2 className="text-2xl font-bold">{resident.name}</h2>
          <p className="text-gray-600">Age: {resident.age}</p>
          <p className="text-gray-600">Blood Group: {resident.bloodGroup}</p>
          <p className="text-gray-600">Division: {resident.division}</p>
          <p className="text-gray-600">Contact: {resident.contact}</p>
        </div>

      </div>
      <Link className="w-full m-5 px-6 py-3 text-center text-white bg-[#008FFB] rounded-lg hover:bg-[#006fbb]" to={`/resident/edit`}>
        Edit Profile
      </Link>
      {/* <Link
        to="/resident/forgotten-password"
        className="w-full m-5 px-6 py-3 text-center text-white bg-[#008FFB] rounded-lg hover:bg-[#006fbb]"
      >
        Change Password
      </Link> */}
      <Link
        to="/resident/login"
        className="w-full m-5 px-6 py-3 text-center text-white bg-[#008FFB] rounded-lg hover:bg-[#006fbb]"
      >
        Logout
      </Link>
    </div>
  );
};

export default ResidentDashboard;
