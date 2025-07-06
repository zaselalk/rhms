import { FC, useState } from 'react';
import { DashboardContainer } from '../../components/layouts/overlays/DashboardContainer';
import { FiHome, FiUsers } from 'react-icons/fi';

const ITEMS_PER_PAGE = 3;

const SingleDivisionPage: FC = () => {
    const diseases = [
        { name: 'Flu', count: 15 },
        { name: 'Diabetic', count: 30 },
        { name: 'Hypertension', count: 20 },
        { name: 'Asthma', count: 10 },
        { name: 'Malaria', count: 5 },
    ];

    const households = [
        { houseId: 'H001', owner: 'Nimal Perera', peopleCount: 5 },
        { houseId: 'H002', owner: 'Kumari Jayawardena', peopleCount: 8 },
        { houseId: 'H003', owner: 'Sunil Fernando', peopleCount: 3 },
        { houseId: 'H004', owner: 'Anushka Herath', peopleCount: 4 },
        { houseId: 'H005', owner: 'Ruwan Abeykoon', peopleCount: 6 },
    ];

    const sortedDiseases = diseases.sort((a, b) => a.count - b.count);
    const sortedHouseholds = households.sort((a, b) => a.peopleCount - b.peopleCount);

    // Pagination + Search State for Diseases
    const [diseaseSearch, setDiseaseSearch] = useState('');
    const [diseasePage, setDiseasePage] = useState(1);
    const filteredDiseases = sortedDiseases.filter(d =>
        d.name.toLowerCase().includes(diseaseSearch.toLowerCase())
    );
    const pagedDiseases = filteredDiseases.slice(
        (diseasePage - 1) * ITEMS_PER_PAGE,
        diseasePage * ITEMS_PER_PAGE
    );

    // Pagination + Search State for Households
    const [householdSearch, setHouseholdSearch] = useState('');
    const [householdPage, setHouseholdPage] = useState(1);
    const filteredHouseholds = sortedHouseholds.filter(h =>
        h.owner.toLowerCase().includes(householdSearch.toLowerCase())
    );
    const pagedHouseholds = filteredHouseholds.slice(
        (householdPage - 1) * ITEMS_PER_PAGE,
        householdPage * ITEMS_PER_PAGE
    );

    return (
        <DashboardContainer>
            <div className="flex-1 p-6">
                <div className="flex justify-center items-center mb-8">
                    <h2 className="text-3xl font-bold text-[#008FFB]">Kotagedara</h2>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 place-items-center">
                    <div className="bg-white max-w-xs w-full p-6 rounded-xl shadow-sm flex flex-col items-center text-center space-y-2">
                        <FiHome className="h-8 w-8 text-[#008FFB]" />
                        <p className="text-2xl font-semibold text-gray-800">50</p>
                        <p className="text-sm text-gray-500">Households</p>
                    </div>
                    <div className="bg-white max-w-xs w-full p-6 rounded-xl shadow-sm flex flex-col items-center text-center space-y-2">
                        <FiUsers className="h-8 w-8 text-[#008FFB]" />
                        <p className="text-2xl font-semibold text-gray-800">564</p>
                        <p className="text-sm text-gray-500">Residents</p>
                    </div>
                </div>

                {/* Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Diseases */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-[#008FFB]">Top Diseases</h3>
                            <input
                                type="text"
                                placeholder="Search Disease"
                                className="border rounded px-3 py-1 text-sm"
                                value={diseaseSearch}
                                onChange={e => {
                                    setDiseaseSearch(e.target.value);
                                    setDiseasePage(1);
                                }}
                            />
                        </div>
                        <table className="w-full text-sm mb-2">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="text-left px-4 py-2 text-gray-600">Disease</th>
                                    <th className="text-left px-4 py-2 text-gray-600">Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagedDiseases.map((disease, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-2 text-gray-700">{disease.name}</td>
                                        <td className="px-4 py-2 text-gray-700">{disease.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div className="flex justify-center gap-2 text-sm text-gray-600">
                            <button
                                className="px-2 py-1 border rounded disabled:opacity-40"
                                disabled={diseasePage === 1}
                                onClick={() => setDiseasePage(diseasePage - 1)}
                            >
                                Prev
                            </button>
                            <span>
                                Page {diseasePage} / {Math.ceil(filteredDiseases.length / ITEMS_PER_PAGE)}
                            </span>
                            <button
                                className="px-2 py-1 border rounded disabled:opacity-40"
                                disabled={diseasePage >= Math.ceil(filteredDiseases.length / ITEMS_PER_PAGE)}
                                onClick={() => setDiseasePage(diseasePage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>

                    {/* Households */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-[#008FFB]">Households</h3>
                            <input
                                type="text"
                                placeholder="Search Owner"
                                className="border rounded px-3 py-1 text-sm"
                                value={householdSearch}
                                onChange={e => {
                                    setHouseholdSearch(e.target.value);
                                    setHouseholdPage(1);
                                }}
                            />
                        </div>
                        <table className="w-full text-sm mb-2">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="text-left px-4 py-2 text-gray-600">House ID</th>
                                    <th className="text-left px-4 py-2 text-gray-600">Owner</th>
                                    <th className="text-left px-4 py-2 text-gray-600">People Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagedHouseholds.map((household, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-2 text-gray-700">{household.houseId}</td>
                                        <td className="px-4 py-2 text-gray-700">{household.owner}</td>
                                        <td className="px-4 py-2 text-gray-700">{household.peopleCount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div className="flex justify-center gap-2 text-sm text-gray-600">
                            <button
                                className="px-2 py-1 border rounded disabled:opacity-40"
                                disabled={householdPage === 1}
                                onClick={() => setHouseholdPage(householdPage - 1)}
                            >
                                Prev
                            </button>
                            <span>
                                Page {householdPage} / {Math.ceil(filteredHouseholds.length / ITEMS_PER_PAGE)}
                            </span>
                            <button
                                className="px-2 py-1 border rounded disabled:opacity-40"
                                disabled={householdPage >= Math.ceil(filteredHouseholds.length / ITEMS_PER_PAGE)}
                                onClick={() => setHouseholdPage(householdPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardContainer>
    );
};

export default SingleDivisionPage;
