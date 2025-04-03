import { FC } from 'react';
import { AdminNavbar } from '../../components/layouts/admin/AdminNavbar';
import {  useParams } from 'react-router';
import { DashboardContainer } from '../../components/layouts/overlays/DashboardContainer';

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


const SingleDiseasePage: FC = () => {
    const { diseaseName } = useParams<{ diseaseName: string }>(); // Get disease from URL
    console.log("Disease Name from URL : ",diseaseName); // Log the disease name for debugging
    const patientCount = diseasesData[diseaseName as keyof typeof diseasesData] || 0; // Default to 0 if not found


    if(diseaseName) {
    return (
        <DashboardContainer>
            <div className="flex-1 p-6">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-[#008FFB]">{diseaseName}</h2>
                    <div className="px-4 py-2 bg-[#008FFB] text-white rounded-lg">{patientCount} Total</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Top 10 Divisions</h3>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Number</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Division</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Aluthgamgoda</td>
                                <td className="px-4 py-2 text-sm text-gray-700">567</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#2</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Henegama</td>
                                <td className="px-4 py-2 text-sm text-gray-700">536</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardContainer>
    
    );
}
};

export default SingleDiseasePage;
