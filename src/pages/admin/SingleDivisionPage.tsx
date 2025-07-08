import { FC } from "react";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";

const SingleDivisionPage: FC = () => {
  // Sample data for diseases and households
  const diseases = [
    { name: "Flu", count: 15 },
    { name: "Diabetic", count: 30 },
    { name: "Hypertension", count: 20 },
    { name: "Asthma", count: 10 },
    { name: "Malaria", count: 5 },
  ];

  const households = [
    { houseId: "H001", owner: "Nimal Perera", peopleCount: 5 },
    { houseId: "H002", owner: "Kumari Jayawardena", peopleCount: 8 },
    { houseId: "H003", owner: "Sunil Fernando", peopleCount: 3 },
    { houseId: "H004", owner: "Anushka Herath", peopleCount: 4 },
    { houseId: "H005", owner: "Ruwan Abeykoon", peopleCount: 6 },
  ];

  // Sort diseases by count in ascending order
  const sortedDiseases = diseases.sort((a, b) => a.count - b.count);

  // Sort households by people count in ascending order
  const sortedHouseholds = households.sort(
    (a, b) => a.peopleCount - b.peopleCount,
  );

  return (
    <DashboardContainer>
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#008FFB]">Kotagedara</h2>
        </div>

        {/* Division Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <p className="text-lg font-semibold text-gray-800">50</p>
            <p className="text-sm text-gray-600">Households</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <p className="text-lg font-semibold text-gray-800">564</p>
            <p className="text-sm text-gray-600">Residents</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <p className="text-lg font-semibold text-gray-800">435</p>
            <p className="text-sm text-gray-600">Patients</p>
          </div>
        </div>

        {/* Side-by-Side Tables (Left and Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Top Diseases Table */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#008FFB] mb-4">
              Top Diseases (Sorted by Count)
            </h3>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2 text-sm text-gray-600">
                    Diseases
                  </th>
                  <th className="text-left px-4 py-2 text-sm text-gray-600">
                    Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedDiseases.map((disease, index) => (
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
          </div>

          {/* Households Table */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#008FFB] mb-4">
              Households (Sorted by People Count)
            </h3>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2 text-sm text-gray-600">
                    House ID
                  </th>
                  <th className="text-left px-4 py-2 text-sm text-gray-600">
                    Owner
                  </th>
                  <th className="text-left px-4 py-2 text-sm text-gray-600">
                    People Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedHouseholds.map((household, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {household.houseId}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {household.owner}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {household.peopleCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default SingleDivisionPage;
