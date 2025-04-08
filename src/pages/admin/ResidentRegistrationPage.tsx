import { FC, useState } from "react";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


type ResidentRegistrationProps = {};

const ResidentRegistrationPage: FC<ResidentRegistrationProps> = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nic, setNic] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setDob] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [contactNumber, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [jobState, setjob] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [divisionId, setGramaDivision] = useState("");
    const [maritalState, setMaritalstate] = useState("");
    const [religion, setReligion] = useState("");
    const [educationLevel, setEducation] = useState("");
    const [addicted, setAddictedd] = useState<string[]>([]);
    const [alergies, setAllergies] = useState<string[]>([]);
    const [chronicalDesease, setChronicDisease] = useState<string[]>([]);
    const [clinics, setClinic] = useState<string[]>([]);
    const [birthCertificateNumber, setBirthCertificateNumber] = useState("");





    const addictedlist = [
        "Smoke",
        "Betel Chewing",
        "Alocohol",
        "Other Substance Use",
    ];
    const alergydlist = [
        "Food Allergy",
        "Drug Allergy",
        "Other Allergy",

    ];
    const chronicDeseaselist = [
        "Cancer",
        "Arthritis",
        "Asthma",
        "High Blood Pressure",
        "Low Blood Pressure",
        "Heart Disease",
        "Stroke",
        "Kidney Disease",
        "Liver Disease",
        "Thyroid Disease",
        "Epilepsy",
        "Mental Illness",
        "HIV/AIDS",
        "Other",

    ];

    const Cliniclist = [
        "Medical Clinic",
        "HCL",
        "Dental Clinic",
        "Specialist Clinic",
        "Eye Clinic",
        "ENT Clinic",
        "Skin Clinic",
        "Diabetic Clinic",
        "Child Clinic",
        "Womens Clinic",
        "Other Clinic",

    ];


    const GramaniladariDivision = [
        { id: 1, name: "Kotagedara" },
        { id: 2, name: "Kolahakada" },
        { id: 3, name: "Pahalawela" },
        { id: 4, name: "alpitiya" },
        { id: 5, name: "Diyagala" },
        { id: 6, name: "Kolahakada" },
    ];


    const caldate2 = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format





    const handleAddicted = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setAddictedd((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };

    const handleAllergy = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setAllergies((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    }

    const handleChronicDisease = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setChronicDisease((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    }
    const HandleClinics = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setClinic((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    }

    const handleRegister = () => {
        let errors = [];

        // Validate the form data
        if (contactNumber.length !== 10 || !contactNumber.match(/^[0-9]{10}$/)) {
            errors.push("Please enter a valid 10-digit contact number.");
        }

        if (weight !== "" && (!weight.match(/^[0-9]+(\.[0-9]+)?$/) || parseFloat(weight) <= 0)) {
            errors.push("Please enter a valid weight.");
        }

        if (height !== "" && (!height.match(/^[0-9]+(\.[0-9]+)?$/) || parseFloat(height) <= 0)) {
            errors.push("Please enter a valid height.");
        }

        if (!/^[0-9]{9}[VXvx]$/.test(nic) && !/^[0-9]{12}$/.test(nic)) {
            errors.push("Please enter a valid Sri Lankan NIC (9 digits + 'V'/'X' or 12 digits).");
        }

        if (errors.length > 0) {
            errors.forEach(error => toast.error(error));
            return;
        }

        // Log the registration data
        // console.log("Registered:", { firstName, lastName, birthday, contactNumber, address, gender, addicted, weight, height, divisionId, maritalState, religion, educationLevel, jobState, alergies, chronicalDesease, clinics, bloodGroup, birthCertificateNumber });

        // Example API call
        fetch("http://localhost:3001/resident/createResident", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName,
                lastName,
                nic,
                email,
                password: "",
                birthday,
                bloodGroup,
                gender,
                address,
                contactNumber,
                divisionId,
                maritalState,
                religion,
                jobState,
                educationLevel,
                addicted,
                alergies,
                chronicalDesease,
                height,
                weight
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Registration successful:", data);
                toast.success("Registration successful!");
            })
            .catch(error => {
                console.error("Error:", error);
                toast.error("Registration failed. Please try again.");
            });
    };

    return (
        <DashboardContainer>
            <ToastContainer />
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
                        <label htmlFor="firstName" className="block text-xl font-medium text-gray-700">
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
                        <label htmlFor="lastName" className="block text-xl font-medium text-gray-700">
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


                    {/* Nic */}
                    <div>
                        <label htmlFor="NIC" className="block text-xl font-medium text-gray-700">
                            NIC
                        </label>
                        <input
                            type="text"
                            id="NIC"
                            maxLength={12}
                            minLength={10}
                            pattern="[0-9]{9}[V]"
                            title="Please enter a valid NIC number (9 digits followed by 'V')"
                            value={nic}
                            onChange={(e) => setNic(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                            placeholder="Enter NIC "
                        />
                    </div>


                    {/* Date of Birth */}
                    <div>
                        <label htmlFor="dob" className="block text-xl font-medium text-gray-700">
                            Date of Birth
                        </label>
                        <input
                            type="date"

                            // max="2005-12-31"
                            max={caldate2}
                            id="dob"
                            value={birthday}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                        />
                    </div>

                    {/* Contact */}
                    <div>
                        <label htmlFor="contact" className="block text-xl font-medium text-gray-700">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            id="contact"
                            minLength={10}
                            maxLength={10}

                            value={contactNumber}
                            onChange={(e) => setContact(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"

                            placeholder="0XX XXX XXXX"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-xl font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                            placeholder="Enter email"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block text-xl font-medium text-gray-700">
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

                    {/* Gender */}
                    <div>
                        <label htmlFor="Gender" className="block text-xl font-medium text-gray-700">Gender</label>

                        <select name="Gender" id="Gender" className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>

                        </select>

                    </div>


                    {/* Grama Division Dropdown */}
                    <div>
                        <label htmlFor="division" className="block text-xl font-medium text-gray-700">Grama Division</label>
                        <select
                            id="division"
                            // value={divisionId}
                            onChange={(e) => setGramaDivision(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                        >
                            <option value="" disabled>Select Grama Division</option>
                            {GramaniladariDivision.map((division) => (
                                <option key={division.id} value={division.id}>
                                    {division.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Marital State */}
                    <div>
                        <label className="block text-xl font-medium text-gray-700">Marital State</label>

                        <select
                            name="MaritalState"
                            id="MaritalState"
                            onChange={(e) => setMaritalstate(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none">
                            <option value="Married" >Married</option>
                            <option value="Unmarried">Unmarried</option>
                            <option value="Unmarried">Widowed</option>
                            <option value="Divorced">Divorced</option>
                        </select>
                    </div>
                    {/* BirthCertificate Number */}

                    <div>
                        <label htmlFor="bcnum" className="block text-xl font-medium text-gray-700">
                            BirthCertificate Number
                        </label>
                        <input
                            type="text"
                            id="bcnum"
                            value={birthCertificateNumber}
                            onChange={(e) => setBirthCertificateNumber(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                            placeholder="Enter Birth Certificate Number "
                        />
                    </div>




                    {/* Religion */}
                    <div>
                        <label className="block text-xl font-medium text-gray-700">Religion</label>
                        <select name="Religion" id="Religion"
                            onChange={(e) => setReligion(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none">
                            <option value="Buddhist">Buddhist</option>
                            <option value="Christian">Christian</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Muslim">Muslim</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Education Level */}
                    <div>
                        <label className="block text-xl font-medium text-gray-700">Education level</label>
                        <select name="Educationlevel" id="Educationlevel"
                            onChange={(e) => setEducation(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none">
                            <option value="No Formal Education">No Formal Education</option>
                            <option value="Grade 1-5 ">Grade 1-5</option>
                            <option value="Grade 6-10">Grade 6-10</option>
                            <option value="Odinary Level">Odinary Level</option>
                            <option value="Advance Level">Advance Level</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Digree">Digree</option>
                            <option value="Post Graduate">Post Graduate</option>

                        </select>
                    </div>

                    {/* Job Details */}
                    <div>
                        <label className="block text-xl font-medium text-gray-700">Job Details</label>
                        <select name="jobState" id="jobState"
                            onChange={(e) => setjob(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none">
                            <option value="No Formal Education">Worker</option>
                            <option value="Semi_artisan">Semi-artisan</option>
                            <option value="Artisan">Artisan</option>
                            <option value="Excecutive">Excecutive</option>t
                            <option value="Unemployment">Unemployment</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>



                    {/* Heidght */}
                    <div>
                        <label htmlFor="Height" className="block text-xl font-medium text-gray-700">
                            Height
                        </label>
                        <input
                            type="number"
                            id="Height"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                            placeholder="Enter Height cm"
                        />
                    </div>
                    {/* Weight */}
                    <div>
                        <label htmlFor="Weight" className="block text-xl font-medium text-gray-700">
                            Weight
                        </label>
                        <input
                            type="number"
                            id="Weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                            placeholder="Enter Weight kg"
                        />
                    </div>
                    {/* Blood Group */}
                    <div>
                        <label className="block text-xl font-medium text-gray-700">Blood Group</label>
                        <select name="bloodGroup" id="bloodGroup"
                            onChange={(e) => setBloodGroup(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none">
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    {/* Addicteds */}
                    <div className="col-span-2">
                        <label className="block text-xl font-medium text-gray-700">Addicteds</label>
                        <div className="gap-4 mt-3 ml-3 flex">
                            {addictedlist.map((option) => (
                                <label key={option} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        value={option}
                                        checked={addicted.includes(option)}
                                        onChange={handleAddicted}
                                    />
                                    {option}
                                </label>
                            ))}

                        </div>
                    </div>







                </div>


                {/* Health Details */}
                <div className="mt-10 mb-5">
                    <h2 className="text-2xl">Health Details</h2>
                    <hr className="bg-gray-100 mb-2" />
                </div>




                {/* Alergies */}
                <div className="col-span-2">
                    <label className="block text-xl font-medium text-gray-700" >Allergies</label>
                    <div className="gap-4 mt-3 ml-3 flex">
                        {alergydlist.map((option) => (
                            <label key={option} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={option}
                                    // check={alergydlist.includes(option)}
                                    onChange={handleAllergy}
                                />
                                {option}
                            </label>
                        ))}

                    </div>
                </div>


                {/* Chronic Desease */}
                <div className="mt-5 mb-8 ">
                    <label className="block text-xl font-medium text-gray-700">Chronic Desease</label>
                    <div className="gap-4 mt-3 ml-3 grid items-center grid-cols-4">
                        {chronicDeseaselist.map((option) => (
                            <label key={option} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={option}
                                    // checked={chronicDeseases.includes(option)}
                                    onChange={handleChronicDisease}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Clinic Details */}
                <div className="mt-5 mb-8 ">
                    <label className="block text-xl font-medium text-gray-700">Attendant Clinic</label>
                    <div className="gap-4 mt-3 ml-3 grid items-center grid-cols-4">
                        {Cliniclist.map((option) => (
                            <label key={option} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={option}
                                    // checked={clinics.includes(option)}
                                    onChange={HandleClinics}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
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
        </DashboardContainer>
    );
};

export default ResidentRegistrationPage;
