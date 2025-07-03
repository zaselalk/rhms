import { Link } from "react-router";

const resident = {
  id: "1",
  name: "Kamal Wichramanayake",
  age: 45,
  bloodGroup: "O+",
  contact: "0711287298",
  division: "Katugahahena",
  profilePic: "/avatars/1.jpg",
  last_visit: "2025/02/10",
};

const ResidentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col px-4 sm:px-6 md:px-8">
      {/* Main Content */}
      <div className="w-full">
        {/* Page Content */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#008FFB]">
              Resident Profile
            </h2>
            {/* <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
              <Link
                to="/household/manage"
                className="text-[#008FFB] border border-[#008FFB] rounded-md px-4 py-2 hover:bg-[#00C1A7] text-center"
              >
                Manage Household
              </Link>
              <Link
                to="edit"
                className="text-[#008FFB] border border-[#008FFB] rounded-md px-4 py-2 hover:bg-[#00C1A7] text-center"
              >
                Edit Details
              </Link>
            </div> */}
          </div>

          {/* Profile Overview */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col sm:flex-row">
            <div className="ml-0 sm:ml-6 flex-grow">
              <div className="flex w-full">
                <h3 className="text-xl font-semibold text-gray-800">
                  Name: {resident.name}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm text-gray-600 mt-4">
                <p>
                  <strong>Age:</strong> {resident.age}
                </p>
                <p>
                  <strong>Blood Group:</strong> {resident.bloodGroup}
                </p>
                <p>
                  <strong>Division:</strong> {resident.division}
                </p>
                <p>
                  <strong>Contact:</strong> {resident.contact}
                </p>
                <p>
                  <strong>Contact:</strong> {resident.contact}
                </p>
                <p>
                  <strong>Contact:</strong> {resident.contact}
                </p>
                <p>
                  <strong>Contact:</strong> {resident.contact}
                </p>
                <p>
                  <strong>Contact:</strong> {resident.contact}
                </p>
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
