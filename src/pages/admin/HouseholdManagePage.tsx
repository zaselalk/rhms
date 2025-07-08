import { FC, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";

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

  // 🔁 Fetch residents on load
  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await fetch(`http://localhost:3001/household-resident/${householdId}/residents`);
        const result = await response.json();

        if (result.data) {
          const mapped = result.data.map((entry: any) => ({
            id: entry.resident.id,
            name: `${entry.resident.firstName} ${entry.resident.lastName}`,
            age: calculateAge(entry.resident.birthday),
            relation: entry.relation,
            recordId: entry.id, // record ID of household_resident
          }));
          setResidents(mapped);
        }
      } catch (error) {
        console.error("Error fetching household residents", error);
      }
    };

    fetchResidents();
  }, [householdId]);

  // 🔍 Search for resident
  const handleSearchResident = async () => {
    if (!searchId) return;

    try {
      const response = await fetch(`http://localhost:3001/resident/id/${searchId}`);
      const data = await response.json();
      if (data?.data) {
        setFoundResident({
          id: data.data.id,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          birthday: data.data.birthday,
        });
      } else {
        alert("Resident not found");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Resident not found");
    }
  };

  // ➕ Add resident to household
  const handleAddResident = async () => {
    if (!foundResident || !relationToOwner.trim()) {
      alert("Please search and validate the resident before adding.");
      return;
    }

    const existingResident = residents.find(
      (resident) => resident.id === foundResident.id
    );
    if (existingResident) {
      alert("Resident already exists in this household!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/household-resident/${householdId}/add-resident`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          residentId: foundResident.id,
          relation: relationToOwner,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        const newResident = result.data;
        setResidents([
          ...residents,
          {
            id: foundResident.id,
            name: `${foundResident.firstName} ${foundResident.lastName}`,
            age: calculateAge(foundResident.birthday.toString()),
            relation: relationToOwner,
            recordId: newResident.id,
          },
        ]);
        setSearchId("");
        setRelationToOwner("");
        setFoundResident(null);
      } else {
        alert(result.message || "Failed to add resident.");
      }
    } catch (error) {
      console.error("Error adding resident:", error);
    }
  };

  // ❌ Remove resident from household
  const handleRemoveResident = async (recordId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/household-resident/${recordId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setResidents(residents.filter((r) => r.recordId !== recordId));
      } else {
        alert("Failed to remove resident.");
      }
    } catch (error) {
      console.error("Error removing resident", error);
    }
  };

  return (
    <DashboardContainer>
      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-2xl font-semibold text-[#008FFB] mb-6">
          Manage Residents
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-[#008FFB] mb-4">
            Add Resident by ID
          </h3>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter resident ID"
              className="px-4 py-2 border rounded"
            />
            <button
              onClick={handleSearchResident}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Search
            </button>
          </div>

          {foundResident && (
            <div>
              <p className="mb-2 text-green-600">
                ✅ Found: {foundResident.firstName} {foundResident.lastName}
              </p>
            </div>
          )}

          <input
            type="text"
            value={relationToOwner}
            onChange={(e) => setRelationToOwner(e.target.value)}
            placeholder="Enter relation"
            className="px-4 py-2 border rounded mr-2"
          />
          <button
            onClick={handleAddResident}
            className="px-6 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
          >
            Add Resident
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-[#008FFB] mb-4">
            Residents in Household
          </h3>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-sm text-gray-600">Name</th>
                <th className="px-4 py-2 text-sm text-gray-600">Age</th>
                <th className="px-4 py-2 text-sm text-gray-600">Relation</th>
                <th className="text-left px-4 py-2 text-sm text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {residents.map((resident) => (
                <tr key={resident.id}>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {resident.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {" "}
                    {resident.age}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {resident.relation}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <button
                      onClick={() => handleRemoveResident(resident.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
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
