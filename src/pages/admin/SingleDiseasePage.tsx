import { FC } from "react";
import { useParams } from "react-router";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";

// Sample data structure (same as DiseasesPage)
const diseasesData = {
  Diabetes: 145,
  Hypertension: 261,
  "Low Pressure": 120,
  "High Pressure": 180,
  Depression: 90,
  Osteoporosis: 80,
  Acne: 200,
  Asthma: 250,
  Arrhythmia: 110,
};

// Sample division-wise patient count data
const divisionData = [
  { division: "Aluthgamgoda", count: 567 },
  { division: "Henegama", count: 536 },
  { division: "Kotagedara", count: 536 },
  { division: "Henpita", count: 536 },
  { division: "Navuththuduwa", count: 536 },
  { division: "Katugahahena", count: 536 },
];

const SingleDiseasePage: FC = () => {
  const { diseaseName } = useParams<{ diseaseName: string }>(); // Get disease from URL
  console.log("Disease Name from URL : ", diseaseName); // Log the disease name for debugging

  const patientCount =
    diseasesData[diseaseName as keyof typeof diseasesData] || 0; // Default to 0 if not found

  // Calculate the total patient count including division-wise counts
  const totalPatientCount =
    patientCount + divisionData.reduce((sum, div) => sum + div.count, 0);

  if (diseaseName) {
    return (
      <DashboardContainer>
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#008FFB]">
              {diseaseName}
            </h2>
            <div className="px-4 py-2 bg-[#008FFB] text-white rounded-lg">
              {totalPatientCount} Total Patients
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#008FFB] mb-4">
              Top Divisions
            </h3>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2 text-sm text-gray-600">
                    Number
                  </th>
                  <th className="text-left px-4 py-2 text-sm text-gray-600">
                    Division
                  </th>
                  <th className="text-left px-4 py-2 text-sm text-gray-600">
                    Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {divisionData.map((division, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      #{index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {division.division}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {division.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DashboardContainer>
    );
  }
};

export default SingleDiseasePage;
