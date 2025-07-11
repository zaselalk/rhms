import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { getHouseholdsByDivision } from "../../services/household.service";
import { DivisionService } from "../../services/division.service";

interface Household {
  house_no: string;
  ownerFirstName: string;
  ownerLastName: string;
  residentCount: number;
}

interface Disease {
  name: string;
  count: number;
}

const SingleDivisionPage: FC = () => {
  const { divisionId } = useParams();
  const [divisionName, setDivisionName] = useState<string>("");
  const [households, setHouseholds] = useState<Household[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [residentCount, setResidentCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (divisionId) {
        try {
          // Get division info
          const divisionData = await DivisionService.getDivisionById(divisionId);
          setDivisionName(divisionData.divisionName);

          // Get households for division
          const householdData = await getHouseholdsByDivision(divisionData.divisionName);
          setHouseholds(householdData);

          // Get resident count for division
          const countData = await DivisionService.getResidentCountByDivision(divisionId);
          setResidentCount(countData.residentCount); 

          // Dummy disease data (replace with real API later)
          const dummyDiseases: Disease[] = [
            { name: "Flu", count: 15 },
            { name: "Diabetic", count: 30 },
            { name: "Hypertension", count: 20 },
            { name: "Asthma", count: 10 },
            { name: "Malaria", count: 5 },
          ];
          setDiseases(dummyDiseases);
        } catch (err) {
          console.error("Error fetching data:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [divisionId]);

  const sortedHouseholds = [...households].sort(
    (a, b) => b.residentCount - a.residentCount
  );
  const sortedDiseases = [...diseases].sort((a, b) => b.count - a.count);

  return (
    <DashboardContainer>
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#008FFB]">
            {divisionName || "Loading..."}
          </h2>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading data...</p>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                <p className="text-lg font-semibold text-gray-800">
                  {households.length}
                </p>
                <p className="text-sm text-gray-600">Households</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                <p className="text-lg font-semibold text-gray-800">
                  {residentCount}
                </p>
                <p className="text-sm text-gray-600">Residents</p>
              </div>
            </div>

            {/* Side-by-Side Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Diseases Table */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-[#008FFB] mb-4">
                  Top Diseases (Sorted by Count)
                </h3>
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="text-left px-4 py-2 text-sm text-gray-600">Disease</th>
                      <th className="text-left px-4 py-2 text-sm text-gray-600">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedDiseases.map((disease, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-700">{disease.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{disease.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Households Table */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-[#008FFB] mb-4">
                  Households (Sorted by People Count)
                </h3>
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="text-left px-4 py-2 text-sm text-gray-600">House ID</th>
                      <th className="text-left px-4 py-2 text-sm text-gray-600">Owner</th>
                      <th className="text-left px-4 py-2 text-sm text-gray-600">People Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedHouseholds.map((house, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-700">{house.house_no}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {`${house.ownerFirstName} ${house.ownerLastName}`}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">{house.residentCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardContainer>
  );
};

export default SingleDivisionPage;
