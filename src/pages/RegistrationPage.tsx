import { FC, useState } from "react";
import AdminSlidebar from "../components/layouts/admin/AdminSlidebar";


type RegistrationProps = {};

const RegistrationPage: FC<RegistrationProps> = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");

    const handleRegister = () => {
        // Handle the registration logic here (e.g., save to database, send request to API)
        console.log("Registered:", { firstName, lastName, dob, contact, address });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3">
                <h2 className="text-2xl font-semibold text-[#008FFB] mb-6 text-center">Resident Registration</h2>
                 {/* Reusable Sidebar */}
                 <AdminSlidebar />

                {/* Registration Form */}
                <div className="space-y-4">
                    {/* First Name */}
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                            placeholder="Enter first name"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                            placeholder="Enter last name"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="dob"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                        />
                    </div>

                    {/* Contact */}
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

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleRegister}
                            className="w-full sm:w-auto px-6 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
