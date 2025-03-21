import { FC, useState } from "react";
import AdminSlidebar from "../components/layouts/admin/AdminSlidebar";
import DetailTable from "../components/Common/DetailTable";


type RegistrationProps = {};

const RegistrationPage: FC<RegistrationProps> = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [Gender, setGender] = useState("");
    const [JobDetail, setjob] = useState("");

    const handleRegister = () => {
        // Handle the registration logic here (e.g., save to database, send request to API)
        console.log("Registered:", { firstName, lastName, dob, contact, address, Gender });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex ">
            {/* Reusable Sidebar */}
            <AdminSlidebar />

            {/* Registration Form Container */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-full ">
                <h2 className="text-2xl font-semibold text-[#008FFB] mb-6 text-center">Resident Registration</h2>

                <div className="mt-5 mb-8 ">
                    <h2 className="text-2xl">Personal Details</h2>
                    <hr className="bg-gray-100 mb-2" />
                </div>

                {/* Registration Form */}
                <div className="space-y-4 grid grid-cols-2 gap-4">
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


                    <div>
                        <label htmlFor="Gender" className="block text-sm font-medium text-gray-700">Gender</label>

                        <select name="Gender" id="Gender" className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>

                        </select>

                    </div>

                    <div>
                        <label>Select Grama Division</label>

                        <select name="GramaDivision" id="GramaDivision" className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none">
                            <option value="1">Grama Division 1</option>
                            <option value="2">Grama Division 2</option>
                            <option value="3">Grama Division 3</option>
                            <option value="4">Grama Division 4</option>
                            <option value="5">Grama Division 5</option>
                        </select>
                    </div>
                    <div>
                        <label>Marital State</label>

                        <select name="MaritalState" id="MaritalState" className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none">
                            <option value="Married">Married</option>
                            <option value="Unmarried">Unmarried</option>
                            <option value="Divorced">Divorced</option>
                        </select>
                    </div>
                    <div>
                        <label>Education level</label>

                        <select name="Educationlevel" id="Educationlevel" className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none">
                            <option value="Married">Odinary Level</option>
                            <option value="Unmarried">Advance Level</option>
                            <option value="Divorced">Graduate</option>
                        </select>
                    </div>
                    <div>
                        <label>Job Details</label>

                        <input type="text"
                            id="jobDetails"
                            placeholder="Enter Job Details"
                            value={JobDetail}
                            onChange={(e) => setjob(e.target.value)}

                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none" />
                    </div>
                </div>

                <div className="mt-5 mb-8">
                    <h2 className="text-2xl">Health Details</h2>
                    <hr className="bg-gray-100 mb-2" />
                </div>

                <div className="grid gap-15">
                    <DetailTable TableName={"Current Desiease"} Colunms={[{ title: "Name" }, { title: "Medicine" }, { title: "Time Period" }, { title: "Venue" }]} />
                    <DetailTable TableName={"Surgery"} Colunms={[{ title: "Surgery Name" }, { title: "Reason" }, { title: "Time" }, { title: "Venue" }]} />

                </div>
              

                <div className="mt-5 mb-5" >
                        <label className="mb-50">Clinic level</label>

                        <select name="Educationlevel" id="Educationlevel" className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none">
                            <option value="Married">Odinary Level</option>
                            <option value="Unmarried">Advance Level</option>
                            <option value="Divorced">Graduate</option>
                        </select>
                    </div>


                {/* Submit Button */}
                <div className="flex justify-center mt-10 ">
                    <button
                        onClick={handleRegister}
                        className="w-full sm:w-auto px-6 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
                    >
                        Register
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RegistrationPage;
