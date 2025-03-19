import { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import AdminSlidebar from '../components/layouts/admin/AdminSlidebar';



const EditResidentProfilePage: FC = () => {
    // State to handle form inputs
    const [firstName, setFirstName] = useState('Ravindu');
    const [lastName, setLastName] = useState('Harshana');
    const [birthday, setBirthday] = useState('1995-05-15');
    const [contact, setContact] = useState('0711287298');
    const [address, setAddress] = useState('Katugahahena');
    const navigate = useNavigate();

    const handleSave = () => {
        // Logic to save the updated profile data
        console.log('Profile Updated:', { firstName, lastName, birthday, contact, address });
        navigate('/resident-profile');
    };

    return (
        <div className="min-h-screen bg-gray-100">
             {/* Reusable Sidebar */}
             <AdminSlidebar />

            {/* Navbar */}
            <div className="bg-[#008FFB] p-4 flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white">Hospital Management</h2>
                <div className="flex items-center">
                    <span className="text-sm text-white mr-4">Ravindu (Admin)</span>
                    <button className="text-white border border-white rounded-md px-4 py-2 hover:bg-[#006fbb]">
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
                <div className="flex justify-between items-center mb-6 flex-col sm:flex-row">
                    <h2 className="text-2xl font-semibold text-[#008FFB]">Edit Profile</h2>
                </div>

                {/* Edit Profile Form */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                                placeholder="First Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                                placeholder="Last Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Birthday</label>
                            <input
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact</label>
                            <input
                                type="text"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                                placeholder="Contact"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                                placeholder="Address"
                            />
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditResidentProfilePage;
