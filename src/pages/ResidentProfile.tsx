
import { useParams, Link } from "react-router";


const residents = [
    {id: "STF001",name: "Dr. Ravindu Harshana", age: 45, bloodGroup: "O+", contact: "0711287298", division: "Katugahahena", profilePic: "/avatars/1.jpg" },
    {id: "STF001",name: "Jane Smith", age: 29, bloodGroup: "A+", contact: "0723456789", division: "Colombo", profilePic: "/avatars/2.jpg" },
    {id: "STF001",name: "John Doe", age: 33, bloodGroup: "B-", contact: "0756781234", division: "Galle", profilePic: "/avatars/3.jpg" },
    {id: "STF001",name: "Sara Connor", age: 40, bloodGroup: "AB+", contact: "0778901234", division: "Matara", profilePic: "/avatars/4.jpg" }
];

const ResidentProfilePage = () => {
  const { id } = useParams();
  const resident = residents.find((resident) => resident.id === id);

  if (!resident) {
    return <div className="p-6 text-red-500 text-lg">Resident not found!</div>;
  }

  return (
    <div className="p-6">
      <Link to="/resident" className="mb-4 bg-gray-500 text-white px-4 py-2 rounded">Back to List
      </Link>

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
    </div>
  );
};

export default ResidentProfilePage;
