import React from "react";
import { FaClinicMedical, FaEdit, FaTrash, FaClipboardList } from "react-icons/fa";
import AdminSidebar from "../../components/layouts/admin/AdminSlidebar";
import { Link } from "react-router";

const ClinicDetail: React.FC = () => {
  const clinicPatients = [
    { id: "DB001", name: "Ashfa" },
    { id: "DB002", name: "Asela" },
    { id: "DB003", name: "Ravindu" },
    { id: "DB004", name: "Dilukshi" },
    { id: "DB005", name: "Ashfa" },
    { id: "DB006", name: "Ashfa" },
  ];

  const patientDivisions = [
    { division: "Katugahahena", count: 20 },
    { division: "Diyagala", count: 34 },
    { division: "Kotagedara", count: 23 },
    { division: "Maddegadara", count: 32 },
    { division: "Nawutthuduwa", count: 23 },
    { division: "Kolahekada", count: 34 },
    { division: "Hempita", count: 34 },
    { division: "Karampathara", count: 23 },
    { division: "Katugoda", count: 12 },
    { division: "Delgoda", count: 56 },
  ];

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-6 w-full bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6 bg-white p-4 shadow rounded-lg">
          <div className="flex items-center space-x-3">
            <FaClinicMedical className="text-blue-600 text-3xl" />
            <div>
              <h2 className="text-lg font-bold">Clinic Details</h2>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="bg-green-500 text-white px-4 py-2 flex items-center rounded-lg shadow hover:bg-green-600 transition">
              <FaEdit className="mr-2" /> Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 flex items-center rounded-lg shadow hover:bg-red-600 transition">
              <FaTrash className="mr-2" /> Delete
            </button>
            {/* Wrap the button with Link */}
            <Link to="diabetic/attendance">
              <button className="bg-blue-500 text-white px-4 py-2 flex items-center rounded-lg shadow hover:bg-blue-600 transition">
                <FaClipboardList className="mr-2" /> Get Attendance
              </button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center bg-white p-6 shadow-md rounded-lg mb-6">
          <FaClinicMedical className="text-blue-500 text-5xl mr-4" />
          <div>
            <p className="text-4xl font-bold">236</p>
            <p className="text-gray-500">Diabetic</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Clinic Patients</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">Name</th>
                </tr>
              </thead>
              <tbody>
                {clinicPatients.map((patient, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{patient.id}</td>
                    <td className="p-2">{patient.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Clinic Patient Divisions</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Division</th>
                  <th className="text-left p-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {patientDivisions.map((division, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{division.division}</td>
                    <td className="p-2">{division.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicDetail;
