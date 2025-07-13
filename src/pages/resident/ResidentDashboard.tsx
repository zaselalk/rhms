import { ArrowLeftOutlined } from "@ant-design/icons";
import { useResidentAuth } from "../../components/auth/ResidentAuthContext";
import { Spin } from "antd";

const ResidentDashboard = () => {
  const { resident, logout, isLoading } = useResidentAuth();

  // Show loading if still fetching resident data
  if (isLoading || !resident) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" tip="Loading your dashboard..." />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Resident Health Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {resident.firstName}</p>
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
                  {`${resident.firstName} ${resident.lastName}`}
                </h2>

                <div className="w-full space-y-4 mb-8">
                  {[
                    {
                      label: "Age",
                      value: resident.birthday
                        ? new Date().getFullYear() -
                          new Date(resident.birthday).getFullYear()
                        : "N/A",
                      icon: "👤",
                    },
                    {
                      label: "Blood Group",
                      value: resident.bloodGroup || "N/A",
                      icon: "🩸",
                    },
                    {
                      label: "Division",
                      value: resident.division?.name || "N/A",
                      icon: "📍",
                    },
                    {
                      label: "Contact",
                      value: resident.contactNumber || "N/A",
                      icon: "📞",
                    },
                    {
                      label: "Email",
                      value: resident.email,
                      icon: "�",
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
                  <button
                    onClick={handleLogout}
                    className="w-full inline-flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200"
                  >
                    <span className="mr-2">
                      <ArrowLeftOutlined />
                    </span>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Health Stats */}
          <h2 className="text-m mt-5">Last Updates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[
              {
                title: "Blood Pressure",
                value: "120/89 mm/mg",
                status: "Normal",
                lastUpdate: "2025/02/10",
              },
              {
                title: "Heart Rate",
                value: "120 BPM",
                status: "Normal",
                lastUpdate: "2025/02/10",
              },
              {
                title: "Cholesterol",
                value: "85 mg/dl",
                status: "Normal",
                lastUpdate: "2025/02/10",
              },
              {
                title: "Glucose",
                value: "200 mg/dl",
                status: "High",
                lastUpdate: "2025/02/10",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white sm:p-6 rounded-lg shadow-md "
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {stat.title}
                </h4>
                <p className="text-3xl text-gray-600">{stat.value}</p>
                <p className="text-gray-600">{stat.status}</p>
                <div className="text-xs mt-4 flex justify-between items-center">
                  <p>Last Update</p>
                  <p className=" text-gray-800">{stat.lastUpdate}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-[#008FFB] mt-5">
            Clinic Details
          </h3>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-gray-600 flex-col text-left">
                    Clinic{" "}
                  </th>
                  <th className="px-4 py-2 text-gray-600 flex-col text-left">
                    Date{" "}
                  </th>
                  <th className="px-4 py-2 text-gray-600 flex-col text-left">
                    {" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    clinicName: "Eye Clinic",
                    date: "2024 Oct 02",
                  },
                  {
                    clinicName: "Diabetics",
                    date: "2024 Oct 23",
                  },
                  {
                    clinicName: "Pressure",
                    date: "2024 Apr 02",
                  },
                ].map((record, index) => (
                  <tr key={index} className=" hover:bg-gray-100 rounded-lg">
                    <td className="px-4 py-2 text-gray-700">
                      {record.clinicName}
                    </td>
                    <td className="px-4 py-2 text-gray-700">{record.date}</td>
                    <td className="px-4 py-2">
                      <Link to={"clinicDetails"}>
                        <button className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]">
                          View
                        </button>
                      </Link>
                    </td>
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

export default ResidentDashboard;
