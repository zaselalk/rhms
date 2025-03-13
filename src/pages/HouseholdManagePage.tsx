import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router';

const HouseholdManagePage: FC = () => {
    // Sample data for residents in a household
    const [residents, setResidents] = useState([
        { id: 1, name: 'John Doe', age: 35, relation: 'Father' },
        { id: 2, name: 'Jane Doe', age: 32, relation: 'Mother' },
        { id: 3, name: 'Jack Doe', age: 10, relation: 'Son' },
    ]);

    // States to handle new resident input
    const [newName, setNewName] = useState('');
    const [newAge, setNewAge] = useState('');
    const [newRelation, setNewRelation] = useState('');
    const navigate = useNavigate();

    // Add a new resident to the list
    const handleAddResident = () => {
        if (newName && newAge && newRelation) {
            const newResident = {
                id: residents.length + 1,
                name: newName,
                age: parseInt(newAge),
                relation: newRelation,
            };
            setResidents([...residents, newResident]);
            setNewName('');
            setNewAge('');
            setNewRelation('');
        }
    };

    const handleLogout = () => {
        // Handle logout logic here
        navigate('/household-login');

    }

    // Remove a resident by id
    const handleRemoveResident = (id: number) => {
        setResidents(residents.filter((resident) => resident.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <div className="bg-[#008FFB] p-4 flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white">Hospital Management</h2>
                <div className="flex items-center">
                    <span className="text-sm text-white mr-4">Ravindu (Admin)</span>
                    <button className="text-white border border-white rounded-md px-4 py-2 hover:bg-[#006fbb]" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-[#008FFB] mb-6">Manage Residents</h2>

                {/* Add Resident Form */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Add New Resident</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                                placeholder="Enter resident's name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Age</label>
                            <input
                                type="number"
                                value={newAge}
                                onChange={(e) => setNewAge(e.target.value)}
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                                placeholder="Enter resident's age"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Relation</label>
                            <input
                                type="text"
                                value={newRelation}
                                onChange={(e) => setNewRelation(e.target.value)}
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                                placeholder="Enter relation to household"
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={handleAddResident}
                            className="px-6 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
                        >
                            Add Resident
                        </button>
                    </div>
                </div>

                {/* Resident Table */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Residents in Household</h3>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Name</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Age</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Relation</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {residents.map((resident) => (
                                <tr key={resident.id}>
                                    <td className="px-4 py-2 text-sm text-gray-700">{resident.name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{resident.age}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{resident.relation}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        <button
                                            onClick={() => handleRemoveResident(resident.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HouseholdManagePage;
