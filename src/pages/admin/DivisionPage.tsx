import React, { FC, useState } from 'react';
import Modal from '../../components/layouts/overlays/Modal';
import { Link } from 'react-router';
import { DashboardContainer } from '../../components/layouts/overlays/DashboardContainer';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { Line } from 'react-chartjs-2'; // Import Line chart from react-chartjs-2
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Division {
    id: number;
    name: string;
    population: number;
}

const DivisionPage: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [divisions, setDivisions] = useState<Division[]>([
        { id: 1, name: "Katugahahena", population: 236 },
        { id: 2, name: "Kotagedara", population: 190 },
        { id: 3, name: "Diyagala", population: 300 },
        { id: 4, name: "Nowthuduwa", population: 290 },
        { id: 6, name: "Pahalawela", population: 150 },
        { id: 7, name: "Madegedara", population: 250 },
        { id: 8, name: "Boopitiya", population: 345},
        { id: 9, name: "Karampethara", population: 250 },
    ]);
    const [newDivision, setNewDivision] = useState<Division | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [divisionToDelete, setDivisionToDelete] = useState<Division | null>(null);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleAddDivision = (name: string, population: number) => {
        const newDivision = {
            id: divisions.length + 1,
            name,
            population,
        };
        setDivisions([...divisions, newDivision]);
        setIsOpen(false);
    };

    const handleDelete = (division: Division) => {
        setDivisionToDelete(division);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (divisionToDelete) {
            setDivisions(divisions.filter(d => d.id !== divisionToDelete.id));
        }
        setIsDeleteModalOpen(false);
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setDivisionToDelete(null);
    };

    // Generate chart data for all divisions
    const generateChartData = () => {
        const divisionNames = divisions.map(division => division.name);
        const divisionPopulations = divisions.map(division => division.population);

        return {
            labels: divisionNames, // X-axis labels: Division Names
            datasets: [
                {
                    label: 'Population by Division',
                    data: divisionPopulations, // Y-axis data: Population of each division
                    borderColor: '#008FFB', // Line color
                    backgroundColor: 'rgba(0, 143, 251, 0.2)', // Fill color under the line
                    fill: true,
                    tension: 0.4, // Smoothing of the line
                },
            ],
        };
    };

    return (
        <DashboardContainer>
            <div className="min-h-screen flex">
                <Modal isOpen={isOpen} handleClose={handleClose} title="Add Division">
                    <div className="p-6">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (newDivision) {
                                    handleAddDivision(newDivision.name, newDivision.population);
                                }
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label htmlFor="division" className="block text-sm font-semibold text-gray-600">
                                    Division Name
                                </label>
                                <input
                                    type="text"
                                    id="division"
                                    placeholder="Enter Division Name"
                                    value={newDivision?.name || ''}
                                    onChange={(e) => setNewDivision({ ...newDivision!, name: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="population" className="block text-sm font-semibold text-gray-600">
                                    Population
                                </label>
                                <input
                                    type="number"
                                    id="population"
                                    placeholder="Enter Population"
                                    value={newDivision?.population || ''}
                                    onChange={(e) => setNewDivision({ ...newDivision!, population: +e.target.value })}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
                                >
                                    Add Division
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>

                {/* Delete Confirmation Modal */}
                {isDeleteModalOpen && (
                    <Modal isOpen={isDeleteModalOpen} handleClose={cancelDelete} title="Confirm Deletion">
                        <div className="p-6">
                            <p className="text-sm text-gray-600">Are you sure you want to delete the division {divisionToDelete?.name}?</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
                                    onClick={confirmDelete}
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    className="px-4 py-2 ml-2 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400"
                                    onClick={cancelDelete}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}

                <div className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-[#008FFB]">Division Details</h2>
                        <button
                            className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
                            onClick={handleOpen}
                        >
                            <FaPlus className="mr-2" />
                            New
                        </button>
                    </div>

                    {/* Division Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {divisions.map((division) => (
                            <Link
                                to={`/${division.id}`}
                                key={division.id}
                                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                            >
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">{division.name}</p>
                                    <p className="text-sm text-gray-600">{division.population}</p>
                                </div>
                                <button
                                    className="text-red-500"
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent navigation
                                        handleDelete(division);
                                    }}
                                >
                                    <FaTrash />
                                </button>
                            </Link>
                        ))}
                    </div>

                    {/* Line Graph for Population of All Divisions */}
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800">Population of All Divisions</h3>
                        <Line data={generateChartData()} options={{ responsive: true }} />
                    </div>
                </div>
            </div>
        </DashboardContainer>
    );
};

export default DivisionPage;
