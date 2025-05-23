import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { DashboardContainer } from '../../components/layouts/overlays/DashboardContainer';

interface DivisionCount {
  division: string | number; // division id or name, based on your backend design
  count: number;
}

const SingleDiseasePage: FC = () => {
  // Get disease name from URL parameters
  const { diseaseName } = useParams<{ diseaseName: string }>();

  // State to store fetched division counts and loading/error status
  const [divisionCounts, setDivisionCounts] = useState<DivisionCount[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (diseaseName) {
      const fetchDivisionCounts = async () => {
        try {
          const response = await axios.get(`/diseases/counts/${diseaseName}`);
          // Expect response.data to be an array of { division, count } objects
          setDivisionCounts(response.data);
        } catch (err) {
          console.error('Error fetching division counts:', err);
          setError('Error fetching division counts.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchDivisionCounts();
    }
  }, [diseaseName]);

  // Calculate the total count from all divisions
  const totalPatientCount = divisionCounts.reduce(
    (sum, div) => sum + div.count,
    0
  );

  return (
    <DashboardContainer>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#008FFB]">
            {diseaseName}
          </h2>
          <div className="px-4 py-2 bg-[#008FFB] text-white rounded-lg">
            {isLoading ? 'Loading...' : `${totalPatientCount} Total Patients`}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-[#008FFB] mb-4">
            Division-wise Patient Count
          </h3>
          {isLoading ? (
            <div>Loading...</div>
          ) : divisionCounts.length === 0 ? (
            <div>No data available for {diseaseName}</div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2 text-sm text-gray-600">#</th>
                  <th className="text-left px-4 py-2 text-sm text-gray-600">Division</th>
                  <th className="text-left px-4 py-2 text-sm text-gray-600">Count</th>
                </tr>
              </thead>
              <tbody>
                {divisionCounts.map((div, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      #{index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {div.division}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {div.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardContainer>
  );
};

export default SingleDiseasePage;
