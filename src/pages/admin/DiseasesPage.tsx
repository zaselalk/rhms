import { FC } from 'react';
import { Link } from 'react-router';
import { AdminNavbar } from '../../components/layouts/admin/AdminNavbar';
import { DashboardContainer } from '../../components/layouts/overlays/DashboardContainer';

        

const diseasesData = [
    { name: "Diabetes", patients: 145 },
    { name: "Hypertension", patients: 261 },
    { name: "Low Pressure", patients: 120 },
    { name: "High Pressure", patients: 180 },
    { name: "Depression", patients: 90 },
    { name: "Osteoporosis", patients: 80 },
    { name: "Acne", patients: 200 },
    { name: "Asthma", patients: 250 },
    { name: "Arrhythmia", patients: 110 },
];

const DiseasesPage: FC = () => {
    return (
        <DashboardContainer>
            <div className="flex-1 p-6">
                <AdminNavbar />
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-[#008FFB]">Diseases</h2>
                    <button className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]">
                        + Add New
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Disease Name</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Patients</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {diseasesData.map((disease) => (
                                <tr key={disease.name}>
                                    <td className="px-4 py-2 text-sm text-gray-700">{disease.name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{disease.patients}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        <Link
                                            to={`/diseases/${disease.name}`}
                                            className="text-[#008FFB] hover:text-[#00C1A7]"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardContainer>
    );
};

export default DiseasesPage;
