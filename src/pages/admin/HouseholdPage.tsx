import { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import AdminSlidebar from '../../components/layouts/admin/AdminSlidebar';
import { AdminNavbar } from '../../components/layouts/admin/AdminNavbar';
import { Modal, Select, message } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardContainer } from '../../components/layouts/overlays/DashboardContainer';


const HouseholdPage: FC = () => {
    const navigate = useNavigate();
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteReason, setDeleteReason] = useState('');
    
    const deleteOptions = ['Moved Out', 'Deceased', 'Duplicate Entry', 'Other'];
    
    const householdData = [
        { division: 'Kotagedara', count: 10 },
        { division: 'Navuththuduwa', count: 15 },
        { division: 'Bopitiya', count: 8 },
    ];
    
    const registeredHouseholds = [
        { id: 'H001', owner: 'John Doe', division: 'Kotagedara' },
        { id: 'H002', owner: 'Jane Smith', division: 'Kotagedara' },
        { id: 'H003', owner: 'Michael Brown', division: 'Bopitiya' },
    ];
    
    const handleAddHousehold = () => {
        navigate('/admin/households/create');
    };
    
    const handleViewHousehold = (householdid: string) => {
        navigate(`/admin/households/manage/${householdid}`);
    };
    
    const handleDeleteHousehold = () => {
        setDeleteModalVisible(true);
    };
    
    const handleConfirmDelete = () => {
        message.success('Household removed successfully!');
        setDeleteModalVisible(false);
    };
    
    return (
        <DashboardContainer>
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-[#008FFB]">Household Management</h2>
                    <button 
                        className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
                        onClick={handleAddHousehold}
                    >
                        + Add Household
                    </button>
                </div>

                {/* Info Cards */}
                <div className="flex mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-md mr-4 flex-1 text-center">
                        <p className="text-lg font-semibold text-gray-800">{registeredHouseholds.length}</p>
                        <p className="text-sm text-gray-600">Total Households</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md flex-1 text-center">
                        <p className="text-lg font-semibold text-gray-800">32</p>
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
                                        <button className="text-[#008FFB] hover:text-[#00C1A7] mr-4" onClick={() => handleViewHousehold(household.id)}>View</button>
                                        <button className="text-red-500 hover:text-red-700" onClick={handleDeleteHousehold}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal 
                title="Confirm Removal" 
                visible={isDeleteModalVisible} 
                onCancel={() => setDeleteModalVisible(false)}
                footer={null}
            >
                <p>Please select a reason for removal:</p>
                <Select 
                    className="w-full mt-2" 
                    placeholder="Select a reason" 
                    onChange={value => setDeleteReason(value)}
                >
                    {deleteOptions.map(option => <Select.Option key={option} value={option}>{option}</Select.Option>)}
                </Select>
                {deleteReason === 'Other' && <input type="text" placeholder="Enter reason" className="mt-2 w-full p-2 border rounded" />}
                <div className="flex justify-end mt-4">
                    <button className="mr-2 px-4 py-2 bg-gray-300 rounded-lg" onClick={() => setDeleteModalVisible(false)}>Cancel</button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={handleConfirmDelete}>Submit</button>
                </div>
            </Modal>
        </DashboardContainer>
    );
};

export default HouseholdPage;
