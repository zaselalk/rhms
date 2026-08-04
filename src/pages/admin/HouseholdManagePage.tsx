import { FC, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { message, Modal } from "antd";
import { UserPlus, Users, Search } from "lucide-react";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import householdresidentService from "../../services/householdresident.service";
import residentService from "../../services/resident.service";
import { useAppSelector } from "../../hooks/state/hooks";

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase() || "?";
};

const avatarPalette = [
  "bg-[#008FFB]/10 text-[#008FFB]",
  "bg-emerald-100 text-emerald-600",
  "bg-purple-100 text-purple-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
];

const avatarColor = (seed: string) => {
  const index = seed.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return avatarPalette[index % avatarPalette.length];
};

const relationBadgeStyles: Record<string, string> = {
  Owner: "bg-[#008FFB]/10 text-[#008FFB]",
  Father: "bg-purple-100 text-purple-600",
  Mother: "bg-pink-100 text-pink-600",
  Sister: "bg-amber-100 text-amber-600",
  Brother: "bg-amber-100 text-amber-600",
  Son: "bg-emerald-100 text-emerald-600",
  Daughter: "bg-emerald-100 text-emerald-600",
};

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
  const user = useAppSelector((state) => state.auth.user);

  const calculateAge = (birthday: string) => {
    const birthYear = new Date(birthday).getFullYear();
    return currentYear - birthYear;
  };

  //  Fetch residents on load
  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const result = await householdresidentService.getResidentsByHouseholdId(
          householdId!
        );
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
      const response = await residentService.getSingleResident(searchId);
      res= response.data;
    } else {
      const response = await residentService.searchResidentByNic(searchId);
      res = response.data;
    }

      

      if (res) {
        setFoundResident({
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName,
          birthday: res.birthday,
        });
        message.success(`Found: ${res.firstName} ${res.lastName}`);
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
      (resident) => resident.id === foundResident.id
    );
    if (existingResident) {
      message.warning("Resident already exists in this household!");
      return;
    }

    try {
      const newResident = await householdresidentService.addResidentToHousehold(
        householdId!,
        {
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
      <div className="min-h-screen max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#008FFB] mb-6">
          Manage Residents
        </h2>

        {/* This section render for users that have household edit permission */}
        {user?.permissions?.includes("household:edit") && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <UserPlus size={20} className="text-[#008FFB]" />
              <h3 className="text-lg font-semibold text-gray-800">
                Add Resident to the Household
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="relative flex-1 min-w-[220px]">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
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
                  placeholder="Enter resident ID or NIC"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#008FFB]/30 focus:border-[#008FFB] outline-none transition-all"
                />
              </div>
              <button
                onClick={handleSearchResident}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
              >
                Search
              </button>
            </div>

            {foundResident && (
              <div className="flex items-center gap-3 mb-4 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs font-semibold">
                  {getInitials(`${foundResident.firstName} ${foundResident.lastName}`)}
                </div>
                <p className="text-emerald-700 text-sm font-medium">
                  Found: {foundResident.firstName} {foundResident.lastName}
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={relationToOwner}
                onChange={(e) => setRelationToOwner(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#008FFB]/30 focus:border-[#008FFB] outline-none transition-all text-gray-700"
              >
                <option value="" disabled>
                  Select relation
                </option>
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
                className="flex items-center gap-2 px-5 py-2.5 bg-[#008FFB] text-white font-semibold rounded-xl shadow-sm hover:bg-[#006fbb] transition-colors"
              >
                <UserPlus size={16} />
                Add Resident
              </button>
            </div>
          </div>
        )}

        {/* Displaying residents in the household */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-2 p-6 pb-4">
            <Users size={20} className="text-[#008FFB]" />
            <h3 className="text-lg font-semibold text-gray-800">
              Residents in Household
            </h3>
          </div>

          {residents.length === 0 ? (
            <div className="flex flex-col items-center gap-2 text-gray-400 py-16">
              <Users size={32} />
              <p className="text-sm">No residents in this household yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Relation
                    </th>
                    {user?.permissions?.includes("household:edit") && (
                      <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {residents.map((resident) => (
                    <tr
                      key={resident.id}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${avatarColor(
                              resident.id + resident.name
                            )}`}
                          >
                            {getInitials(resident.name)}
                          </div>
                          <span className="font-medium text-gray-800">{resident.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-gray-600">
                        {resident.age}
                      </td>
                      <td className="px-6 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            relationBadgeStyles[resident.relation] || "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {resident.relation}
                        </span>
                      </td>

                      {user?.permissions?.includes("household:edit") && (
                        <td className="px-6 py-3.5 text-right">
                          {resident.relation.trim().toLowerCase() !== "owner" ? (
                            <button
                              className="px-3.5 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg font-medium text-sm transition-colors"
                              onClick={() => handleRemoveResident(resident.recordId)}
                            >
                              Remove
                            </button>
                          ) : (
                            <span className="text-gray-400 text-sm">Cannot remove owner</span>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardContainer>
  );
};

export default HouseholdManagePage;
