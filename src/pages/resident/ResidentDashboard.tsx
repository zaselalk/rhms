import { Link } from "react-router";
import { ArrowLeftOutlined } from "@ant-design/icons";

const resident = {
  id: "1",
  name: "Kamal Wichramanayake",
  age: 45,
  bloodGroup: "O+",
  contact: "0711287298",
  division: "Katugahahena",
  last_visit: "2025/02/10",
};

const ResidentDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Resident Health Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {resident.name.split(" ")[0]}
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Profile Card */}
          <div className="xl:col-span-4 order-1 xl:order-1">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <img
                    src="/images/resident-profile-male.svg"
                    alt="Profile"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  {resident.name}
                </h2>

                <div className="w-full space-y-4 mb-8">
                  {[
                    { label: "Age", value: resident.age, icon: "👤" },
                    {
                      label: "Blood Group",
                      value: resident.bloodGroup,
                      icon: "🩸",
                    },
                    { label: "Division", value: resident.division, icon: "📍" },
                    { label: "Contact", value: resident.contact, icon: "📞" },
                    {
                      label: "Last Visit",
                      value: resident.last_visit,
                      icon: "📅",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium text-gray-700">
                          {item.label}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
                <p className=" mt-3 text-sm text-gray-600 mb-4">
                  Anything need to be updated? Please meet our staff at the
                  hospital
                </p>
                <div className="w-full border-t border-gray-200 pt-6">
                  <Link
                    to="/resident/login"
                    className="w-full inline-flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200"
                  >
                    <span className="mr-2">
                      <ArrowLeftOutlined />
                    </span>
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-8 order-2 xl:order-2 space-y-6">
            {/* Health Stats */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Health Metrics
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: "Blood Pressure",
                    value: "120/89",
                    unit: "mm/mg",
                    status: "Normal",
                    lastUpdate: "2025/02/10",
                    icon: "💓",
                    color: "green",
                  },
                  {
                    title: "Heart Rate",
                    value: "120",
                    unit: "BPM",
                    status: "Normal",
                    lastUpdate: "2025/02/10",
                    icon: "❤️",
                    color: "green",
                  },
                  {
                    title: "Cholesterol",
                    value: "85",
                    unit: "mg/dl",
                    status: "Normal",
                    lastUpdate: "2025/02/10",
                    icon: "🧪",
                    color: "green",
                  },
                  {
                    title: "Glucose",
                    value: "200",
                    unit: "mg/dl",
                    status: "High",
                    lastUpdate: "2025/02/10",
                    icon: "🍯",
                    color: "red",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{stat.icon}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          stat.color === "green"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {stat.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-gray-600 mb-2">
                      {stat.title}
                    </h4>

                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </span>
                      <span className="text-sm text-gray-500">{stat.unit}</span>
                    </div>

                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <span>📅</span>
                      <span>Updated: {stat.lastUpdate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Registered Clinics */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">🩺</span>
                Registered Clinics
              </h3>

              <div className="space-y-3">
                {[
                  { clinicName: "Eye Clinic", color: "blue" },
                  { clinicName: "Diabetics", color: "purple" },
                  { clinicName: "Pressure", color: "red" },
                ].map((clinic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 hover:from-blue-50 hover:to-indigo-50"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-gray-900 text-lg">
                        {clinic.clinicName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Active</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentDashboard;
