import { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { Modal, Select, message } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardContainer } from '../../components/layouts/overlays/DashboardContainer';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { HouseholdCreateModal } from '../../components/features/household-management/HouseholdCreateModal';
import { Button } from '../../components/Common/Button';


const HouseholdPage: FC = () => {
    const navigate = useNavigate();
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [selectedHousehold, setSelectedHousehold] = useState<any>(null);
    const [newOwner, setNewOwner] = useState('');
    const [deleteReason, setDeleteReason] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const deleteOptions = ['Moved Out', 'Deceased', 'Duplicate Entry', 'Other'];
    
    const householdData = [
        { division: 'Kotagedara', count: 10 },
        { division: 'Navuththuduwa', count: 15 },
        { division: 'Bopitiya', count: 8 },
        { division: 'Maddegedara', count: 5 },
        { division: 'Pahalawela', count: 12 },
        { division: 'Kolahekada', count: 7 },
        { division: 'Narawila', count: 9 },
        { division: 'Yatadola', count: 11 },
        { division: 'Henpita', count: 6 },
        { division: 'Pallegoda', count: 13 },
    ];

    // const householdData = registeredHouseholds.reduce((acc: any[], household) => {
    //     const existing = acc.find(item => item.division === household.division);
    //     if (existing) {
    //         existing.count += 1;
    //     } else {
    //         acc.push({ division: household.division, count: 1 });
    //     }
    //     return acc;
    // }, []);
    
    const [registeredHouseholds, setRegisteredHouseholds] = useState([
        { id: 'H001', owner: 'John Doe', division: 'Kotagedara' },
        { id: 'H002', owner: 'Jane Smith', division: 'Kotagedara' },
        { id: 'H003', owner: 'Michael Brown', division: 'Bopitiya' },
        { id: 'H004', owner: 'John White', division: 'Navuththuduwa' },
         
    ]);
    

    const residents = [
        { id: 'R001', name: 'Alice Johnson' },
        { id: 'R002', name: 'Bob Williams' },
        { id: 'R003', name: 'Charlie Davis' },
    ];

    const handleAddHousehold = () => {
        navigate('/admin/households/create');
    };

    const totalResidents = residents.length;


    const handleViewHousehold = (householdid: string) => {
        navigate(`/admin/households/manage/${householdid}`);
    };
    
    const handleDeleteHousehold = (householdId: string) => {
        setRegisteredHouseholds(prev => prev.filter(household => household.id !== householdId));
        message.success('Household deleted successfully!');
        setDeleteModalVisible(false);
    };

    const handleEditHousehold = (household: any) => {
        setSelectedHousehold(household);
        setEditModalVisible(true);
    };

    const handleConfirmEdit = () => {
        if (!newOwner) return message.error('Please select a new owner!');
        setRegisteredHouseholds(prev => prev.map(household => 
            household.id === selectedHousehold.id ? { ...household, owner: newOwner } : household
        ));
        message.success('Household owner updated successfully!');
        setEditModalVisible(false);
    };
    
    return (
        <DashboardContainer>
            <HouseholdCreateModal isOpen={isOpen} handleClose={()=>setIsOpen(false)}/>
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-[#008FFB]">Household Management</h2>
                    <Button 
                        className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
                        onClick={()=> setIsOpen(true) }
                    >
                        + Add Household
                    </Button>
                </div>

                {/* Info Cards */}
                <div className="flex mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-md mr-4 flex-1 text-center">
                        <p className="text-lg font-semibold text-gray-800">96</p>
                        <p className="text-sm text-gray-600">Total Households</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md flex-1 text-center">
                        <p className="text-lg font-semibold text-gray-800">6542</p>
                        <p className="text-sm text-gray-600">Total Residents</p>
                    </div>
                </div>

                {/* Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Households Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={householdData}>
                            <XAxis dataKey="division" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#008FFB" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Household List */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">ID</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Owner</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Division</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registeredHouseholds.map((household) => (
                                <tr key={household.id}>
                                    <td className="px-4 py-2 text-sm text-gray-700">{household.id}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{household.owner}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{household.division}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
    <div className="flex space-x-2">
        <button
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
            onClick={() => handleViewHousehold(household.id)}
        >
            <span className="mr-2">View</span>
            <EyeOutlined />
        </button>

        <button
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition"
            onClick={() => handleEditHousehold(household)}
        >
            <span className="mr-2">Edit</span>
            <EditOutlined />
        </button>

        <button
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition"
            onClick={() => handleDeleteHousehold(household.id)}
        >
            <span className="mr-2">Delete</span>
            <DeleteOutlined />
        </button>
    </div>
</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Household Modal */}
            <Modal 
                title="Edit Household Owner" 
                open={isEditModalVisible} 
                onCancel={() => setEditModalVisible(false)}
                onOk={handleConfirmEdit}
            >
                <Select 
                    className="w-full" 
                    placeholder="Select new owner" 
                    onChange={value => setNewOwner(value)}
                >
                    {residents.map(resident => <Select.Option key={resident.id} value={resident.name}>{resident.name}</Select.Option>)}
                </Select>
            </Modal>
        </DashboardContainer>
    );
};

export default HouseholdPage;
