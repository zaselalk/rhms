import { FC, useEffect, useState } from "react";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { getHouseholdsByDivision } from "../../services/household.service";
import { DivisionService } from "../../services/division.service";

import { FaHome, FaUsers } from "react-icons/fa";
//import { GiVirus } from "react-icons/gi";
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
          const divisionData = await DivisionService.getDivisionById(
            divisionId
          );
          setDivisionName(divisionData.divisionName);

          const householdData: Household[] = await getHouseholdsByDivision(
            divisionData.divisionName
          );
          setHouseholds(householdData);
          setHouseholdCount(householdData.length);

          const countData = await DivisionService.getResidentCountByDivision(
            divisionId
          );
          setResidentCount(countData.residentCount);

          const diseaseData: { [key: string]: number } =
            await residentDiseaseService.getDiseasePatientCounts(
              Number(divisionId)
            );

          const diseaseArray = Object.entries(diseaseData).map(
            ([name, count]) => ({
              name,
              count,
            })
          );
          setDiseases(diseaseArray);

          // Fetch owner names
          const namesMap: { [key: number]: string } = {};
          await Promise.all(
            householdData.map(async (house) => {
              try {
                const res =
                  await HouseholdResidentService.getResidentsByHouseholdId(
                    house.id
                  );
                const owner = res.data.find((r: any) => r.relation === "owner");
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

  const totalHouseholdPages = Math.ceil(
    filteredHouseholds.length / ITEMS_PER_PAGE
  );
  const totalDiseasePages = Math.ceil(filteredDiseases.length / ITEMS_PER_PAGE);

  return (
    <DashboardContainer>
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-[#008FFB]">
            {divisionName || "Loading..."}
          </h2>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading data...</p>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-2">
                <FaHome className="text-[#008FFB] text-5xl" />
                <p className="text-4xl font-extrabold text-gray-900">
                  {householdCount}
                </p>
                <p className="text-lg font-medium text-gray-600">Households</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-2">
                <FaUsers className="text-[#008FFB] text-5xl" />
                <p className="text-4xl font-extrabold text-gray-900">
                  {residentCount}
                </p>
                <p className="text-lg font-medium text-gray-600">Residents</p>
              </div>
            </div>

            {/* Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Diseases Table */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-[#008FFB]">
                    Top Diseases
                  </h3>
                  <input
                    type="text"
                    placeholder="Search diseases..."
                    className="border px-3 py-1 rounded w-1/2"
                    value={diseaseSearch}
                    onChange={(e) => {
                      setDiseaseSearch(e.target.value);
                      setDiseasePage(1);
                    }}
                  />
                </div>
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="text-left px-4 py-2 text-sm text-gray-600">
                        Disease
                      </th>
                      <th className="text-left px-4 py-2 text-sm text-gray-600">
                        Count
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDiseases.map((disease, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {disease.name}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {disease.count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-end space-x-2">
                  {Array.from({ length: totalDiseasePages }, (_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded ${
                        diseasePage === i + 1
                          ? "bg-blue-500 text-white"
                          : "border"
                      }`}
                      onClick={() => setDiseasePage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Households Table */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-[#008FFB]">
                    Households
                  </h3>
                  <input
                    type="text"
                    placeholder="Search owner..."
                    className="border px-3 py-1 rounded w-1/2"
                    value={householdSearch}
                    onChange={(e) => {
                      setHouseholdSearch(e.target.value);
                      setHouseholdPage(1);
                    }}
                  />
                </div>
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="text-left px-4 py-2 text-sm text-gray-600">
                        House ID
                      </th>
                      <th className="text-left px-4 py-2 text-sm text-gray-600">
                        Owner
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedHouseholds.map((house, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {house.house_no}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {ownerNames[house.id] || "Loading..."}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-end space-x-2">
                  {Array.from({ length: totalHouseholdPages }, (_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded ${
                        householdPage === i + 1
                          ? "bg-blue-500 text-white"
                          : "border"
                      }`}
                      onClick={() => setHouseholdPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardContainer>
  );
};

export default SingleDivisionPage;
