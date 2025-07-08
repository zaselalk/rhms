import { Link } from "react-router";

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our System</h1>
      <p className="text-lg mb-4">Select your login type:</p>

      <div className="space-y-4">
        <Link
          to="/admin/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Admin Login
        </Link>
        <Link
          to="/resident/login"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Resident Login
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
