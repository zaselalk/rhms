import { FC, useEffect, useState } from "react";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";

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

const ITEMS_PER_PAGE = 3;

const SingleDivisionPage: FC = () => {
  //const [divisionName, setDivisionName] = useState<string>("Division");
  const [households, setHouseholds] = useState<Household[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);

  const [householdSearch, setHouseholdSearch] = useState("");
  const [diseaseSearch, setDiseaseSearch] = useState("");
  const [householdPage, setHouseholdPage] = useState(1);
  const [diseasePage, setDiseasePage] = useState(1);

  useEffect(() => {
    const dummyHouseholds: Household[] = [
      { house_no: "H001", ownerFirstName: "John", ownerLastName: "Doe", residentCount: 4 },
      { house_no: "H002", ownerFirstName: "Jane", ownerLastName: "Smith", residentCount: 3 },
      { house_no: "H003", ownerFirstName: "Amal", ownerLastName: "Perera", residentCount: 6 },
      { house_no: "H004", ownerFirstName: "Sunil", ownerLastName: "Fernando", residentCount: 2 },
      { house_no: "H005", ownerFirstName: "Nimal", ownerLastName: "Silva", residentCount: 5 },
    ];

    const dummyDiseases: Disease[] = [
      { name: "Flu", count: 15 },
      { name: "Diabetic", count: 30 },
      { name: "Hypertension", count: 20 },
      { name: "Asthma", count: 10 },
      { name: "Malaria", count: 5 },
    ];

    setHouseholds(dummyHouseholds);
    setDiseases(dummyDiseases);
    setLoading(false);
  }, []);

  const filteredHouseholds = households.filter(h =>
    `${h.ownerFirstName} ${h.ownerLastName}`.toLowerCase().includes(householdSearch.toLowerCase())
  );

  const filteredDiseases = diseases.filter(d =>
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
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#008FFB]">Division Name</h2>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading data...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                <p className="text-lg font-semibold text-gray-800">{households.length}</p>
                <p className="text-sm text-gray-600">Households</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                <p className="text-lg font-semibold text-gray-800">
                  {households.reduce((sum, h) => sum + h.residentCount, 0)}
                </p>
                <p className="text-sm text-gray-600">Residents</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-[#008FFB]">Top Diseases</h3>
                  <input
                    type="text"
                    placeholder="Search diseases..."
                    className="border px-3 py-1 rounded w-1/2"
                    value={diseaseSearch}
                    onChange={e => {
                      setDiseaseSearch(e.target.value);
                      setDiseasePage(1);
                    }}
                  />
                </div>
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="text-left px-4 py-2 text-sm text-gray-600">Disease</th>
                      <th className="text-left px-4 py-2 text-sm text-gray-600">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDiseases.map((disease, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-700">{disease.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{disease.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-end space-x-2">
                  {Array.from({ length: totalDiseasePages }, (_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded ${diseasePage === i + 1 ? "bg-blue-500 text-white" : "border"}`}
                      onClick={() => setDiseasePage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-[#008FFB]">Households</h3>
                  <input
                    type="text"
                    placeholder="Search owner..."
                    className="border px-3 py-1 rounded w-1/2"
                    value={householdSearch}
                    onChange={e => {
                      setHouseholdSearch(e.target.value);
                      setHouseholdPage(1);
                    }}
                  />
                </div>
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="text-left px-4 py-2 text-sm text-gray-600">House ID</th>
                      <th className="text-left px-4 py-2 text-sm text-gray-600">Owner</th>
                      <th className="text-left px-4 py-2 text-sm text-gray-600">People Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedHouseholds.map((house, index) => (
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
                <div className="mt-4 flex justify-end space-x-2">
                  {Array.from({ length: totalHouseholdPages }, (_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded ${householdPage === i + 1 ? "bg-blue-500 text-white" : "border"}`}
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
