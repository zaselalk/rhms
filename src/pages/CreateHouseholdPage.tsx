import { FC, useState } from "react";
import AdminSidebar from "../components/layouts/admin/AdminSlidebar";


const CreateHouseholdPage: FC = () => {
    // State to handle form inputs
    const [householdName, setHouseholdName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [members, setMembers] = useState("");

    const handleCreateHousehold = () => {
        // Handle the logic for creating a household (e.g., save to backend or state)
        console.log("Household Created:", {
            householdName,
            address,
            contact,
            members,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Reusable Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h2 className="text-2xl font-semibold text-[#008FFB] mb-6">Create Household</h2>

                {/* Create Household Form */}
                <div className="space-y-4">
                    {/* Household Name */}
                    <div>
                        <label htmlFor="householdName" className="block text-sm font-medium text-gray-700">
                            Household Name
                        </label>
                        <input
                            type="text"
                            id="householdName"
                            value={householdName}
                            onChange={(e) => setHouseholdName(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                            placeholder="Enter household name"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <textarea
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                            placeholder="Enter address"
                        />
                    </div>

                    {/* Contact Number */}
                    <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            id="contact"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                            placeholder="Enter contact number"
                        />
                    </div>

                    {/* Household Members */}
                    <div>
                        <label htmlFor="members" className="block text-sm font-medium text-gray-700">
                            Household Members
                        </label>
                        <input
                            type="number"
                            id="members"
                            value={members}
                            onChange={(e) => setMembers(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                            placeholder="Enter number of members"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleCreateHousehold}
                            className="w-full sm:w-auto px-6 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
                        >
                            Create Household
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateHouseholdPage;
