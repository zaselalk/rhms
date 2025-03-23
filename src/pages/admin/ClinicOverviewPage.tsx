import React from "react";
import { FaClinicMedical, FaTrash } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router";
import AdminSidebar from "../../components/layouts/admin/AdminSlidebar";

const ClinicOverview: React.FC = () => {
  // Sample data for clinic categories
  const clinicCategories = [
    { name: "Diabetic", count: 236, change: "10%", increase: true },
    { name: "Hypo lipid", count: 34, change: "10%", increase: false },
    { name: "Asthma", count: 45, change: "10%", increase: false },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="p-6 w-full bg-gray-100 min-h-screen">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 shadow rounded-lg">
          <div className="flex items-center space-x-3">
            <FaClinicMedical className="text-blue-600 text-3xl" />
            <div>
              <h2 className="text-lg font-bold">Clinic Overview</h2>
              <p className="text-gray-500 text-sm">Total Clinics: 23</p>
            </div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 flex items-center rounded-lg shadow hover:bg-blue-600 transition">
            <FiPlusCircle className="mr-2" /> New Clinic
          </button>
        </div>

        {/* Clinic Categories Section */}
        <h3 className="text-xl font-semibold mb-4">Clinic Categories</h3>
        <div className="grid grid-cols-3 gap-4">
          {clinicCategories.map((clinic, index) => (
            <Link
              key={index}
              to={`/admin/clinic/diabetic`}
              className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center cursor-pointer hover:shadow-lg transition"
            >
              <div>
                <h4 className="text-lg font-semibold">{clinic.name}</h4>
                <p className="text-2xl font-bold">{clinic.count}</p>
                <p className="text-gray-500 text-sm">Last month</p>
                <p
                  className={`text-sm font-semibold ${clinic.increase ? "text-green-500" : "text-red-500"
                    }`}
                >
                  {clinic.change} {clinic.increase ? "▲" : "▼"}
                </p>
              </div>
              <FaTrash className="text-gray-500 cursor-pointer hover:text-red-600 transition" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClinicOverview;
