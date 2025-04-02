import { FC } from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import AdminSlidebar from '../../components/layouts/admin/AdminSlidebar';
import { AdminNavbar } from '../../components/layouts/admin/AdminNavbar';
import { Modal, Select, message } from 'antd';

const HouseholdPage: FC = () => {
    const navigate = useNavigate();

    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [deleteReason, setDeleteReason] = useState('');
    const [addReason, setAddReason] = useState('');
    
    const deleteOptions = ['Moved Out', 'Deceased', 'Duplicate Entry', 'Other'];

  
    const handleAddResident = () => {
        setAddModalVisible(true);
    };
    
   

    const handleViewResident = () => {
        navigate('/admin/residents/STF001');
    };

    const handleDeleteResident = () => {
        setDeleteModalVisible(true);
    };

    const handleConfirmDelete = () => {
        message.success('Resident removed successfully!');
        setDeleteModalVisible(false);
    };

    const handleConfirmAdd = () => {
        message.success('Resident added successfully!');
        setAddModalVisible(false);
        // navigate(''/admin/residents/add');
    };

    
    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Reusable Sidebar */}
            <AdminSlidebar />

        

            {/* Main Content */}
            <div className="flex-1 p-6">
                
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-[#008FFB]">Household Resident Manage</h2>
                    <button 
                            className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
                            onClick={handleAddResident}
                        >
                            + Add Resident
                        </button>
                    </div>

                {/* Household Stats */}
                <div className="flex mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-md mr-4 flex-1 text-center">
                        <p className="text-lg font-semibold text-gray-800">8</p>
                        <p className="text-sm text-gray-600">Houses</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md flex-1 text-center">
                        <p className="text-lg font-semibold text-gray-800">8</p>
                        <p className="text-sm text-gray-600">Total Residents</p>
                    </div>
                </div>

                {/* Residents List */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="text-left px-4 py-2 text-sm text-gray-600">ID</th>
                                    <th className="text-left px-4 py-2 text-sm text-gray-600">Name</th>
                                    <th className="text-left px-4 py-2 text-sm text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 text-sm text-gray-700">#STF001</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">Dr. Ravindu Harshana</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        <button className="text-[#008FFB] hover:text-[#00C1A7] mr-4" onClick={handleViewResident}> View
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button className="text-red-500 hover:text-red-700" onClick={handleDeleteResident}> Delete
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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

            {/* Add Resident Modal */}
            <Modal 
                title="Confirm Addition" 
                visible={isAddModalVisible} 
                onCancel={() => setAddModalVisible(false)}
                footer={null}
            >
                <p>Please select a reason for adding a new resident:</p>
                <Select 
                    className="w-full mt-2" 
                    placeholder="Select a reason" 
                    onChange={value => setAddReason(value)}
                >
                    {deleteOptions.map(option => <Select.Option key={option} value={option}>{option}</Select.Option>)}
                </Select>
                <div className="flex justify-end mt-4">
                    <button className="mr-2 px-4 py-2 bg-gray-300 rounded-lg" onClick={() => setAddModalVisible(false)}>Cancel</button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={handleConfirmAdd}>Submit</button>
                </div>
            </Modal>
        </div>
        </div>

    );
};

export default HouseholdPage;   



