import { FC, useEffect, useState } from "react";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "antd";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";

import { residentValidation } from "../../validation/residentValidation";
import residentService from "../../services/resident.service";
import { ResidentData } from "../../types/resident";
import { ClinicService } from "../../services/clinic.service";
import { DivisionService } from "../../services/division.service";
import diseaseService from "../../services/disease.service";
import { useParams } from "react-router";
import { Eye, EyeOff } from "lucide-react";
type ResidentEditPageProps = {};

const ResidentEditPage: FC<ResidentEditPageProps> = () => {
  const initialValues2: ResidentData = {
    firstName: "",
    lastName: "",
    nic: "",
    email: "",
    password: "",
    birthday: "",
    bloodGroup: "",
    gender: "",
    address: "",
    contactNumber: "",
    divisionId: "",
    maritalState: "",
    religion: "",
    educationLevel: "",
    addicted: [],
    alergies: [],
    chronicalDesease: [],
    clinic: [],
    height: "",
    weight: "",
    bloodPressure: "",
    heartRate: "",
    glucose: 0,
    Birthcertificate: "",
    jobdetail: "",
    deletedAt: null as Date | null, // Assuming deletedAt can be null
  };
  const [initialValues, setinital] = useState<ResidentData>(initialValues2);

  const [showPassword, setShowPassword] = useState(false);
  const [addicted, setAddictedd] = useState<string[]>([]);
  const [alergies, setAllergies] = useState<string[]>([]);

  type Division = {
    divisionId: number;
    divisionName: string;
  };

  const [GramaniladariDivision, setGramaniladariDivision] = useState<
    Division[]
  >([]);

  type Clinic = {
    id: string;
    name: string;
  };

  type Disease = {
    diseaseId: number;
    diseaseName: string;
  };

  const [chronicDiseases, setChronicDiseases] = useState<Disease[]>([]);
  const [selectedDiseaseNames, setSelectedDiseaseNames] = useState<string[]>(
    []
  );

  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [selectedClinicIds, setSelectedClinicIds] = useState<string[]>([]);

  const { id } = useParams<{ id: string }>();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  const fetchResidentData = async () => {
    if (id) {
      try {
        const response = await residentService.getSingleResident(id);
        const resident = response.data;

        const formattedResident = {
          ...resident,
          birthday: formatDate(resident.birthday), // ✅ Convert to YYYY-MM-DD
        };

        setinital(formattedResident);
        console.log("Resident Data:", formattedResident);
      } catch (err) {
        console.error("Failed to fetch resident data", err);
      }
    }
  };

  // Fetch all clinics when the component mounts
  useEffect(() => {
    fetchResidentData();

    //Fetch Disease  Function
    const fetchDiseases = async () => {
      try {
        const response = await diseaseService.getAllDiseaseswithID();
        setChronicDiseases(response.data); // assuming `data` is inside `response.data`
      } catch (error) {
        console.error("Error fetching diseases:", error);
      }
    };

    //Fetch Clinic Function
    const fetchClinics = async () => {
      try {
        const data = await ClinicService.getAllClinics();
        setClinics(data);
      } catch (error) {
        console.error("Error fetching clinics:", error);
      }
    };

    //Fetch Division
    const fetchGramaniladariDivision = async () => {
      try {
        const data = await DivisionService.getAllDivisions();
        // Assuming the data is an array of objects with id and name properties
        setGramaniladariDivision(data);
      } catch (error) {
        console.error("Error fetching Gramaniladari Division:", error);
      }
    };

    fetchGramaniladariDivision();
    fetchDiseases();
    fetchClinics();
  }, []);

  const handleClinicCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    setSelectedClinicIds((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  const addictedlist = [
    "Smoke",
    "Betel Chewing",
    "Alocohol",
    "Other Substance Use",
  ];
  const alergydlist = ["Food Allergy", "Drug Allergy", "Other Allergy"];

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
  };

  const handleChronicDiseaseChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, value } = e.target;

    setSelectedDiseaseNames((prev) =>
      checked ? [...prev, value] : prev.filter((name) => name !== value)
    );
  };

  const residentRegister = residentService;

  const mutation = useMutation({
    mutationFn: async (values: ResidentData) => {
      if (!id) {
        throw new Error("Resident ID is missing.");
      }
      await residentRegister.updateResidentData(id, values); // ✅ values come from `mutate(values)`
    },
    onSuccess: () => {
      toast.success("Updated Successfully");

      formik.resetForm();
      fetchResidentData();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Update failed. Please try again.");
    },
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: residentValidation,
    onSubmit: (values) => {
      values.addicted = addicted;
      values.alergies = alergies;
      values.chronicalDesease = selectedDiseaseNames;
      values.clinic = selectedClinicIds;

      mutation.mutate(values);
      console.log(values);
    },
  });

  return (
    <DashboardContainer>
      <ToastContainer />
      {formik.status && <Alert message={formik.status} type="error" />}
      <form onSubmit={formik.handleSubmit}>
        {/* Registration Form Container */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full ">
          <h2 className="text-2xl font-semibold text-[#008FFB] mb-6 text">
            Edit Resident Data
          </h2>

          <div className="mt-5 mb-8 ">
            <h2 className="text-2xl">Personal Details</h2>
            <hr className="bg-gray-100 mb-2" />
          </div>

          {/* Registration Form */}
          <div className="space-y-4 grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-xl font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                {...formik.getFieldProps("firstName")}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                placeholder="Enter first name"
              />
            </div>
            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-xl font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                {...formik.getFieldProps("lastName")}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                placeholder="Enter last name"
              />
            </div>

            {/* Nic */}
            <div>
              <label
                htmlFor="NIC"
                className="block text-xl font-medium text-gray-700"
              >
                NIC
              </label>
              <input
                type="text"
                id="NIC"
                maxLength={12}
                minLength={10}
                title="Please enter a valid NIC number (9 digits followed by 'V')"
                {...formik.getFieldProps("nic")}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                placeholder="Enter NIC "
              />
              {formik.touched.nic && formik.errors.nic && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.nic}
                </div>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label
                htmlFor="dob"
                className="block text-xl font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <input
                type="date"
                // max="2005-12-31"
                max={caldate2}
                id="dob"
                {...formik.getFieldProps("birthday")}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
              />
            </div>

            {/* Contact */}
            <div>
              <label
                htmlFor="contact"
                className="block text-xl font-medium text-gray-700"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contact"
                minLength={10}
                maxLength={10}
                {...formik.getFieldProps("contactNumber")}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                placeholder="0XX XXX XXXX"
              />
              {formik.touched.contactNumber && formik.errors.contactNumber && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.contactNumber}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xl font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps("email")}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                placeholder="Enter email"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-xl font-medium text-gray-700"
              >
                Address
              </label>
              <textarea
                id="address"
                {...formik.getFieldProps("address")}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                placeholder="Enter address"
              />
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="Gender"
                className="block text-xl font-medium text-gray-700"
              >
                Gender
              </label>

              <select
                id="Gender"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                {...formik.getFieldProps("gender")}
                value={formik.values.gender}
                defaultChecked={true}
                defaultValue={"Male"}
              >
                <option defaultValue={"Male"} value="Male">
                  Male
                </option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Grama Division Dropdown */}
            <div>
              <label
                htmlFor="division"
                className="block text-xl font-medium text-gray-700"
              >
                Grama Division
              </label>
              <select
                id="division"
                {...formik.getFieldProps("divisionId")}
                value={formik.values.divisionId}
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
              >
                <option value="">Select Grama Division</option>
                {GramaniladariDivision.map((division) => (
                  <option key={division.divisionId} value={division.divisionId}>
                    {division.divisionName}
                  </option>
                ))}
              </select>
            </div>

            {/* Marital State */}
            <div>
              <label className="block text-xl font-medium text-gray-700">
                Marital State
              </label>
              <select
                id="MaritalState"
                {...formik.getFieldProps("maritalState")}
                value={formik.values.maritalState}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
              >
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
                <option value="Unmarried">Widowed</option>
                <option value="Divorced">Divorced</option>
              </select>
            </div>
            {/* BirthCertificate Number */}

            <div>
              <label
                htmlFor="bcnum"
                className="block text-xl font-medium text-gray-700"
              >
                BirthCertificate Number
              </label>
              <input
                type="text"
                id="Birthcertificate"
                {...formik.getFieldProps("Birthcertificate")}
                value={formik.values.Birthcertificate}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                placeholder="Enter Birth Certificate Number "
              />
            </div>

            {/* Religion */}
            <div>
              <label className="block text-xl font-medium text-gray-700">
                Religion
              </label>
              <select
                id="Religion"
                {...formik.getFieldProps("religion")}
                value={formik.values.religion}
                defaultChecked={true}
                defaultValue={"Buddhist"}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
              >
                <option value="Buddhist">Buddhist</option>
                <option value="Christian">Christian</option>
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Education Level */}
            <div>
              <label className="block text-xl font-medium text-gray-700">
                Education level
              </label>
              <select
                id="educationLevel"
                {...formik.getFieldProps("educationLevel")}
                value={formik.values.educationLevel}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
              >
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
              <label className="block text-xl font-medium text-gray-700">
                Job Details
              </label>
              <select
                id="jobdetail"
                {...formik.getFieldProps("jobdetail")}
                value={formik.values.jobdetail}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
              >
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
              <label
                htmlFor="Height"
                className="block text-xl font-medium text-gray-700"
              >
                Height
              </label>
              <input
                type="number"
                id="Height"
                {...formik.getFieldProps("height")}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                placeholder="Enter Height cm"
              />
            </div>

            {/* Weight */}
            <div>
              <label
                htmlFor="Weight"
                className="block text-xl font-medium text-gray-700"
              >
                Weight
              </label>
              <input
                type="number"
                id="Weight"
                {...formik.getFieldProps("weight")}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                placeholder="Enter Weight kg"
              />
              {formik.touched.weight && formik.errors.weight && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.weight}
                </div>
              )}
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-xl font-medium text-gray-700">
                Blood Group
              </label>
              <select
                id="bloodGroup"
                {...formik.getFieldProps("bloodGroup")}
                value={formik.values.bloodGroup}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
              >
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

            {/* Blood Pressure */}
            <div>
              <label
                htmlFor="bloodPressure"
                className="block text-xl font-medium text-gray-700"
              >
                Blood Pressure
              </label>
              <input
                type="text"
                id="bloodPressure"
                {...formik.getFieldProps("bloodPressure")}
                value={formik.values.bloodPressure}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                placeholder="120/80 Blood Pressure"
              />
              {formik.touched.bloodPressure && formik.errors.bloodPressure && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.bloodPressure}
                </div>
              )}
            </div>

            {/*Heart Rate*/}
            <div>
              <label
                htmlFor="heartRate"
                className="block text-xl font-medium text-gray-700"
              >
                Heart Rate
              </label>
              <input
                type="text"
                id="heartRate"
                {...formik.getFieldProps("heartRate")}
                value={
                  formik.values.heartRate !== undefined
                    ? String(formik.values.heartRate)
                    : ""
                }
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                placeholder="55-61 Heart Rate"
              />
              {formik.touched.heartRate && formik.errors.heartRate && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.heartRate}
                </div>
              )}
            </div>

            {/* Glucose */}
            <div>
              <label
                htmlFor="glucose"
                className="block text-xl font-medium text-gray-700"
              >
                Glucose
              </label>
              <input
                type="text"
                id="glucose"
                {...formik.getFieldProps("glucose")}
                value={
                  formik.values.glucose !== undefined
                    ? String(formik.values.glucose)
                    : ""
                }
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
                placeholder="Glucose Level"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-xl font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...formik.getFieldProps("password")}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none pr-10"
                placeholder="Leave blank to keep current password"
              />

              {/* Eye icon */}
              <div
                className="absolute right-3 top-[42px] cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>

              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Addicteds */}
            <div className="col-span-2">
              <label className="block text-xl font-medium text-gray-700">
                Addicteds
              </label>
              <div className="gap-4 mt-3 ml-3 flex">
                {addictedlist.map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      name="addicted"
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
            <label className="block text-xl font-medium text-gray-700">
              Allergies
            </label>
            <div className="gap-4 mt-3 ml-3 flex">
              {alergydlist.map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={handleAllergy}
                    value={option}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Chronic Disease */}
          <div className="mt-5 mb-8">
            <label className="block text-xl font-medium text-gray-700">
              Chronic Disease
            </label>
            <div className="gap-4 mt-3 ml-3 grid items-center grid-cols-4">
              {chronicDiseases.map((disease) => (
                <label
                  key={disease.diseaseId}
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    value={disease.diseaseName} // ✅ use disease name as value
                    checked={selectedDiseaseNames.includes(disease.diseaseName)}
                    onChange={handleChronicDiseaseChange}
                  />
                  {disease.diseaseName}
                </label>
              ))}
            </div>
          </div>

          {/* Clinic Details */}
          <div className="mt-5 mb-8 ">
            <label className="block text-xl font-medium text-gray-700">
              Attending Clinics
            </label>
            <div className="gap-4 mt-3 ml-3 grid items-center grid-cols-4">
              {clinics.map((clinic) => (
                <label key={clinic.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={clinic.id}
                    checked={selectedClinicIds.includes(clinic.id.toString())}
                    onChange={handleClinicCheckboxChange}
                  />
                  {clinic.name}
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={mutation.isPending}
              onClick={() => {
                if (!formik.isValid) {
                  formik.setTouched(
                    Object.keys(formik.values).reduce(
                      (acc, key) => ({ ...acc, [key]: true }),
                      {}
                    )
                  );
                  toast.error("Please fill in all required fields correctly.");
                }
              }}
              className="w-full sm:w-auto px-6 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? "Updating..." : "Update Resident"}
            </button>
          </div>
        </div>
      </form>
    </DashboardContainer>
  );
};

export default ResidentEditPage;
