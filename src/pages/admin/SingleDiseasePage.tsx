import { FC,useEffect,useState } from 'react';
import { useParams } from 'react-router';
import { DashboardContainer } from '../../components/layouts/overlays/DashboardContainer';
import residentDiseaseService from '../../services/residentDisease.service';


interface DivisionCount {
    division: string;
    count: number;
}

const SingleDiseasePage: FC = () => {
    const { diseaseName } = useParams<{ diseaseName: string }>(); // Get disease from URL
    console.log("Disease Name from URL : ", diseaseName); // Log the disease name for debugging
    
    const [divisionData, setDivisionData] = useState<DivisionCount[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDivisionData = async () => {
            try {
                setLoading(true);
                const response = await residentDiseaseService.getDivisionCountsByDiseaseName(diseaseName || '');
                console.log("📦 Final division data set to state:", response);
                setDivisionData(response.data || []);
            } catch (err:any) {
                console.error('🚨 Failed to load division data:', err);
                setError('Failed to load division data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (diseaseName) {
            fetchDivisionData();
        }
    }, [diseaseName]);


    // const patientCount = diseasesData[diseaseName as keyof typeof diseasesData] || 0; // Default to 0 if not found
    
    // Calculate the total patient count including division-wise counts
    const totalPatientCount = divisionData.reduce((sum, div) => sum + div.count, 0);
    
    if (loading) {
        return (
            <DashboardContainer>
                <div className=" p-6"> Loading Data...</div>
                </DashboardContainer>
        );}

        if(error){
            return (
                <DashboardContainer>
                        <div className="p-6 text-red-600">{error}</div>
            </DashboardContainer>
        );
    }

    return (
        <DashboardContainer>
                    <div className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-[#008FFB]">{diseaseName}</h2>
                        <div className="px-4 py-2 bg-[#008FFB] text-white rounded-lg">{totalPatientCount} Total Patients</div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Top Divisions</h3>
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="text-left px-4 py-2 text-sm text-gray-600">Number</th>
                                    <th className="text-left px-4 py-2 text-sm text-gray-600">Division</th>
                                    <th className="text-left px-4 py-2 text-sm text-gray-600">Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {divisionData.map((division, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 text-sm text-gray-700">#{index + 1}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{division.division}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{division.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    </div>
                    </DashboardContainer>
                
        );
    
};

export default SingleDiseasePage;
