import { Link } from "react-router";
import { useEffect, useState } from "react";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";



const ResidentListPage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [residents2, setResidents] = useState<{
     id: string; firstName: string; lastName: string ,contactNumber:String,address:string
    
    }[]>([]);



  const fetchResidents = async () => {
    console.log("click")
    try {
      // console.log("Send");
      const response = await fetch("http://localhost:3001/resident", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const redata = await response.json();
      // console.log(redata.data);
      setResidents(redata.data);
      console.log(residents2);



    } catch (error) {
      console.error("Error fetching residents:", error);
    }
  };

  useEffect(() => {
    fetchResidents();
  }, []);




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
              <tr className="bg-gray-50 text-center">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Address</th>
                <th className="p-3"></th>
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
                  <tr key={resident.id} className=" hover:bg-gray-100 text-center">
                    <td className="p-3">{resident.id}</td>
                    <td className="p-3">{resident.firstName} {resident.lastName}</td>
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
    </DashboardContainer>
  );
};

export default ResidentListPage;
