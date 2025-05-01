import { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { DashboardContainer } from '../../components/layouts/overlays/DashboardContainer';

const HouseholdManagePage: FC = () => {
    const [residents, setResidents] = useState([
        { id: 1, name: 'Asela Priyadarshana', age: 35, relation: 'Father' },
        { id: 2, name: 'Ashfa Nisthar', age: 32, relation: 'Mother' },
        { id: 3, name: 'Ravindu Harshana', age: 10, relation: 'Son' },
    ]);
    
    // const [addRequests, setAddRequests] = useState([
    //     { id: 4, name: 'Ishara Prasadi', age: 12, relation: 'Daughter' },
    //     { id: 5, name: 'Asiri Sadakan', age: 8, relation: 'Son' },
    //     { id: 6, name: 'Dilukshi Nimasha', age: 15, relation: 'Daughter' },
    // ]);

    const [searchId, setSearchId] = useState('');
    const [relationToOwner, setRelationToOwner] = useState('');
    const navigate = useNavigate();

    // const handleApproveRequest = (requestId: number) => {
    //     const request = addRequests.find(req => req.id === requestId);
    //     if (request) {
    //         setResidents([...residents, request]);
    //         setAddRequests(addRequests.filter(req => req.id !== requestId));
    //     }
    // };

    // const handleDenyRequest = (requestId: number) => {
    //     if (window.confirm('Are you sure you want to deny this request?')) {
    //         setAddRequests(addRequests.filter(req => req.id !== requestId));
    //     }
    // };

    const handleAddResident = () => {
        if (!searchId.trim() || !relationToOwner.trim()) return;
        const existingResident = residents.find(resident => resident.id === Number(searchId));
        if (existingResident) {
            alert('Resident already exists in this household!');
            return;
        }
        
        const newResident = { id: Number(searchId), name: `Resident ${searchId}`, age: 30, relation: relationToOwner };
        setResidents([...residents, newResident]);
        setSearchId('');
        setRelationToOwner('');
    };

     // Remove resident from household
     const handleRemoveResident = (id: number) => {
        setResidents(residents.filter(resident => resident.id !== id));
    };

    return (
        <DashboardContainer>
            <div className="min-h-screen bg-gray-100 p-6">
                <h2 className="text-2xl font-semibold text-[#008FFB] mb-6">Manage Residents</h2>
                
                {/* <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Resident Add Requests</h3>
                    {addRequests.length > 0 ? (
                        <ul>
                            {addRequests.map(req => (
                                <li key={req.id} className="flex justify-between items-center py-2 border-b">
                                    <span>{req.name} ({req.relation})</span>
                                    <div>
                                        <button onClick={() => handleApproveRequest(req.id)} className="px-4 py-1 bg-green-500 text-white rounded mr-2">Approve</button>
                                        <button onClick={() => handleDenyRequest(req.id)} className="px-4 py-1 bg-red-500 text-white rounded">Deny</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No pending requests.</p>
                    )}
                </div> */}

                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Add Resident by ID</h3>
                    <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} placeholder="Enter resident ID" className="px-4 py-2 border rounded mr-2" />
                    <input type="text" value={relationToOwner} onChange={(e) => setRelationToOwner(e.target.value)} placeholder="Enter relation" className="px-4 py-2 border rounded mr-2" />
                    <button onClick={handleAddResident} className="px-6 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]">Add Resident</button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Residents in Household</h3>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-sm text-gray-600">Name</th>
                                <th className="px-4 py-2 text-sm text-gray-600">Age</th>
                                <th className="px-4 py-2 text-sm text-gray-600">Relation</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {residents.map(resident => (
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
        </DashboardContainer>
    );
};

export default HouseholdManagePage;
