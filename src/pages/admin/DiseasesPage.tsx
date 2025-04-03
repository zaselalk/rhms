import { FC, useState } from 'react';
import { Link } from 'react-router';
import { DashboardContainer } from '../../components/layouts/overlays/DashboardContainer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const initialDiseasesData = [
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
    const [diseasesData, setDiseasesData] = useState(initialDiseasesData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDisease, setNewDisease] = useState('');

    const totalDiseases = diseasesData.length;
    const totalPatients = diseasesData.reduce((sum, disease) => sum + disease.patients, 0);

    const handleAddDisease = () => {
        if (newDisease.trim()) {
            if (window.confirm(`Are you sure you want to add "${newDisease}"?`)) {
                setDiseasesData([...diseasesData, { name: newDisease, patients: 0 }]);
                setNewDisease('');
                setIsModalOpen(false);
            }
        }
    };

    const handleDeleteDisease = (diseaseName: string) => {
        if (window.confirm(`Are you sure you want to delete "${diseaseName}"?`)) {
            setDiseasesData(diseasesData.filter(disease => disease.name !== diseaseName));
        }
    };

    return (
        <DashboardContainer>
            <div className="flex-1 p-6">
               
                
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-[#008FFB]">Diseases</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
                    >
                        + Add Disease
                    </button>
                </div>
                
                {/* Add Disease Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
                            <h3 className="text-lg font-semibold mb-4">Add New Disease</h3>
                            <input
                                type="text"
                                placeholder="Enter disease name"
                                value={newDisease}
                                onChange={(e) => setNewDisease(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg mb-4"
                            />
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddDisease}
                                    className="px-4 py-2 bg-[#008FFB] text-white rounded-lg hover:bg-[#006fbb]"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Total Diseases</h3>
                            <p className="text-2xl font-bold text-[#008FFB]">{totalDiseases}</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Total Patients</h3>
                            <p className="text-2xl font-bold text-[#008FFB]">{totalPatients}</p>
                        </div>
                    </div>
                </div>

                {/* Diseases Table */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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
                                        <Link to={`${disease.name}`} className="text-[#008FFB] hover:text-[#00C1A7]">
                                            View
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteDisease(disease.name)}
                                            className="text-red-500 hover:text-red-700 ml-4"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Line Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Disease Statistics</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={diseasesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="patients" stroke="#008FFB" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </DashboardContainer>
    );
};

export default DiseasesPage;