import { FC, useEffect, useState } from "react";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { getHouseholdsByDivision } from "../../services/household.service";
import { DivisionService } from "../../services/division.service";

import { FaHome, FaUsers } from "react-icons/fa";
//import { GiVirus } from "react-icons/gi";
import { Search, Activity, Home } from "lucide-react";
import { useParams } from "react-router";
import residentDiseaseService from "../../services/residentDisease.service";
import HouseholdResidentService from "../../services/householdresident.service";

interface Household {
  id: number;
  house_no: string;
  residentCount: number;
}

interface Disease {
  name: string;
  count: number | string;
}

const ITEMS_PER_PAGE = 3;

const SingleDivisionPage: FC = () => {
  const { divisionId } = useParams();
  const [divisionName, setDivisionName] = useState<string>("");
  const [households, setHouseholds] = useState<Household[]>([]);
  const [ownerNames, setOwnerNames] = useState<{ [key: number]: string }>({});
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [residentCount, setResidentCount] = useState<number>(0);
  const [householdCount, setHouseholdCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const [householdSearch, setHouseholdSearch] = useState("");
  const [diseaseSearch, setDiseaseSearch] = useState("");
  const [householdPage, setHouseholdPage] = useState(1);
  const [diseasePage, setDiseasePage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (divisionId) {
        try {
          const divisionData = await DivisionService.getDivisionById(divisionId);
          setDivisionName(divisionData.divisionName);

          const householdData: Household[] = await getHouseholdsByDivision(divisionData.divisionName);
          setHouseholds(householdData);
          setHouseholdCount(householdData.length);

          const countData = await DivisionService.getResidentCountByDivision(divisionId);
          setResidentCount(countData.residentCount);

          const diseaseData: { [key: string]: number } =
            await residentDiseaseService.getDiseasePatientCounts(Number(divisionId));

          const diseaseArray = Object.entries(diseaseData).map(([name, count]) => ({
            name,
            count,
          }));
          setDiseases(diseaseArray);

          // Fetch owner names
          const namesMap: { [key: number]: string } = {};
          await Promise.all(
            householdData.map(async (house) => {
              try {
                const res = await HouseholdResidentService.getResidentsByHouseholdId(house.id);
                const owner = res.find((r: any) => r.relation === "owner");
                namesMap[house.id] = owner
                  ? `${owner.resident.firstName} ${owner.resident.lastName}`
                  : "Unknown";
              } catch {
                namesMap[house.id] = "Error";
              }
            })
          );
          setOwnerNames(namesMap);
        } catch (error) {
          console.error("Error loading division data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [divisionId]);

  const filteredHouseholds = households.filter((h) =>
    ownerNames[h.id]?.toLowerCase().includes(householdSearch.toLowerCase())
  );

  const filteredDiseases = diseases.filter((d) =>
    d.name.toLowerCase().includes(diseaseSearch.toLowerCase())
  );

  const paginatedHouseholds = filteredHouseholds.slice(
    (householdPage - 1) * ITEMS_PER_PAGE,
    householdPage * ITEMS_PER_PAGE
  );

  const paginatedDiseases = filteredDiseases.slice(
    (diseasePage - 1) * ITEMS_PER_PAGE,
    diseasePage * ITEMS_PER_PAGE
  );

  const totalHouseholdPages = Math.ceil(filteredHouseholds.length / ITEMS_PER_PAGE);
  const totalDiseasePages = Math.ceil(filteredDiseases.length / ITEMS_PER_PAGE);

  return (
    <DashboardContainer>
      <div className="flex-1 max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-[#008FFB]">
            {divisionName || "Loading..."}
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="h-10 w-10 rounded-full border-4 border-[#008FFB]/20 border-t-[#008FFB] animate-spin" />
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#008FFB]/10 text-[#008FFB]">
                  <FaHome size={24} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">{householdCount}</p>
                  <p className="text-sm font-medium text-gray-500">Households</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                  <FaUsers size={24} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">{residentCount}</p>
                  <p className="text-sm font-medium text-gray-500">Residents</p>
                </div>
              </div>
            </div>

            {/* Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Diseases Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Activity size={20} className="text-[#008FFB]" />
                  <h3 className="text-lg font-semibold text-gray-800">Top Diseases</h3>
                </div>
                <div className="relative mb-4">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search diseases..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#008FFB]/30 focus:border-[#008FFB] outline-none transition-all"
                    value={diseaseSearch}
                    onChange={(e) => {
                      setDiseaseSearch(e.target.value);
                      setDiseasePage(1);
                    }}
                  />
                </div>
                {paginatedDiseases.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 text-gray-400 py-10">
                    <Activity size={28} />
                    <p className="text-sm">No disease data found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Disease</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedDiseases.map((disease, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-3 text-sm font-medium text-gray-800">{disease.name}</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#008FFB]/10 text-[#008FFB] text-xs font-semibold">
                                {disease.count}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {totalDiseasePages > 1 && (
                  <div className="mt-4 flex justify-center flex-wrap gap-2">
                    {Array.from({ length: totalDiseasePages }, (_, i) => (
                      <button
                        key={i}
                        className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                          diseasePage === i + 1 ? "bg-[#008FFB] text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => setDiseasePage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Households Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Home size={20} className="text-[#008FFB]" />
                  <h3 className="text-lg font-semibold text-gray-800">Households</h3>
                </div>
                <div className="relative mb-4">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search owner..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#008FFB]/30 focus:border-[#008FFB] outline-none transition-all"
                    value={householdSearch}
                    onChange={(e) => {
                      setHouseholdSearch(e.target.value);
                      setHouseholdPage(1);
                    }}
                  />
                </div>
                {paginatedHouseholds.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 text-gray-400 py-10">
                    <Home size={28} />
                    <p className="text-sm">No households found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">House ID</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Owner</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedHouseholds.map((house, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-3 text-sm font-medium text-gray-800">{house.house_no}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {ownerNames[house.id] || "Loading..."}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {totalHouseholdPages > 1 && (
                  <div className="mt-4 flex justify-center flex-wrap gap-2">
                    {Array.from({ length: totalHouseholdPages }, (_, i) => (
                      <button
                        key={i}
                        className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                          householdPage === i + 1 ? "bg-[#008FFB] text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => setHouseholdPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardContainer>
  );
};

export default SingleDivisionPage;
