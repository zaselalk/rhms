import { FC, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { message, Modal } from "antd";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import householdresidentService from "../../services/householdresident.service";

interface Resident {
  id: number;
  name: string;
  age: number;
  relation: string;
  recordId: number; // household_resident record ID for removal
}

const HouseholdManagePage: FC = () => {
  const { householdId } = useParams<{ householdId: string }>();
  const [residents, setResidents] = useState<Resident[]>([]);
  const [searchId, setSearchId] = useState("");
  const [relationToOwner, setRelationToOwner] = useState("");
  const [foundResident, setFoundResident] = useState<{
    id: number;
    firstName: string;
    lastName: string;
    birthday: Date;
  } | null>(null);

  const currentYear = new Date().getFullYear();

  const calculateAge = (birthday: string) => {
    const birthYear = new Date(birthday).getFullYear();
    return currentYear - birthYear;
  };

  //  Fetch residents on load
  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const result = await householdresidentService.getResidentsByHouseholdId(householdId!);
          const mapped = result.data.map((entry: any) => ({
            id: entry.resident.id,
            name: `${entry.resident.firstName} ${entry.resident.lastName}`,
            age: calculateAge(entry.resident.birthday),
            relation: entry.relation,
            recordId: entry.id, // record ID of household_resident
          }));
          setResidents(mapped);
        
      } catch (error) {
        message.error("Error fetching household residents");
       
      }
    };

    fetchResidents();
  }, [householdId]);

  //  Search for resident
  const handleSearchResident = async () => {
    if (!searchId) return;

   try {
    let res;
    const isNumeric = /^\d+$/.test(searchId);

    if (isNumeric) {
      res = await fetch(`http://localhost:3001/resident/id/${searchId}`);
    } else {
      res = await fetch(`http://localhost:3001/resident/nic/${searchId}`);
    }

      const data = await res.json();
      if (data?.data) {
        setFoundResident({
          id: data.data.id,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          birthday: data.data.birthday,
        });
        message.success(`Found: ${data.data.firstName} ${data.data.lastName}`);

      } else {
        message.error("Resident not found");
      }
    } catch (error) {
      message.error("Resident not found");
      console.error("Search error:", error);
      
    }
  };

  //  Add resident to household
  const handleAddResident = async () => {
    if (!foundResident || !relationToOwner.trim()) {
      message.warning("Please search valid resident and select relation.");
      return;
    }

    const existingResident = residents.find(
      (resident) => resident.id === foundResident.id,
    );
    if (existingResident) {
      message.warning("Resident already exists in this household!");
      return;
    }

    try {
      const newResident = await householdresidentService.addResidentToHousehold(
      householdId!,{
            residentId: foundResident.id,
            relation: relationToOwner,
          }
        
      );

      // const result = await response.json();
      // if (response.ok) {
      //   const newResident = result.data;
        setResidents([
          ...residents,
          {
            id: foundResident.id,
            name: `${foundResident.firstName} ${foundResident.lastName}`,
            age: calculateAge(foundResident.birthday.toString()),
            relation: relationToOwner,
            recordId: newResident.data.id,
          },
        ]);
        setSearchId("");
        setRelationToOwner("");
        setFoundResident(null);
        message.success("Resident added successfully");

     
    } catch (error) {
      message.error("Error adding resident");
      
    }
  };

  //  Remove resident from household
  const handleRemoveResident = async (recordId: number) => {
    Modal.confirm({
      title: "Are you sure you want to remove this resident?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {

    try {
      
        await householdresidentService.removeResidentFromHousehold(recordId);
        setResidents(residents.filter((r) => r.recordId !== recordId));
        message.success("Resident removed successfully.");
        
      
    } catch (error) {
      message.error("Error removing resident.");
      
  }
      },
    });
  };

  return (
    <DashboardContainer>
      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-2xl font-semibold text-[#008FFB] mb-6">
          Manage Residents
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-[#008FFB] mb-4">
            Add Resident to the Household
          </h3>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9vV]*"
              value={searchId}
              onChange={(e) => {
                const input = e.target.value;
                // Allow only numbers and 'v' or 'V'
                if (/^[0-9vV]*$/.test(input)) {
                  setSearchId(input);
                }
              }}

              placeholder="Enter resident ID"
              className="px-4 py-2 border rounded"
            />
            <button
              onClick={handleSearchResident}
              className="px-4 py-2 bg-yellow-500 text-white text-sm rounded-lg shadow-md hover:bg-yellow-600 cursor-pointer"
            >
              Search
            </button>
          </div>

          {foundResident && (
            <div>
              <p className="mb-2 text-green-600">
                 Found: {foundResident.firstName} {foundResident.lastName}
              </p>
            </div>
          )}

          <select
            value={relationToOwner}
            onChange={(e) => setRelationToOwner(e.target.value)}
            className={` px-6 py-2 border-black border rounded mr-5 "${
                    relationToOwner ? "text-gray-400" : "text-black"
            }`}
          >

          <option value="" disabled >Select relation</option>
          <option value="Father">Father</option>
          <option value="Mother">Mother</option>
          <option value="Sister">Sister</option>
          <option value="Brother">Brother</option>
          <option value="Son">Son</option>
          <option value="Daughter">Daughter</option>
          <option value="Boarder">Boarder/Lodger</option>
          </select>


          <button
            onClick={handleAddResident}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg shadow-md hover:bg-blue-600 cursor-pointer"
          >
              Add Resident
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-[#008FFB] mb-4">
            Residents in Household
          </h3>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Age</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Relation</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {residents.map((resident) => (
                <tr key={resident.id} className="border-b">
                  <td className="px-6 py-3 text-sm text-gray-800">
                    {resident.name}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-800">
                    {" "}
                    {resident.age}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-800">
                    {resident.relation}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-800">

                    <button
                    className="px-4 py-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 text-sm cursor-pointer"
                      onClick={() => handleRemoveResident(resident.recordId)}
                      >
                        Remove  
                    </button >
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

export default HouseholdManagePage;
