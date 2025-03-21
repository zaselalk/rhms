import { FC } from "react";
import { Link } from "react-router"; // Ensure you're using react-router-dom for navigation
import AdminSlidebar from "../components/layouts/admin/AdminSlidebar"; // Import the AdminSidebar component

const ResidentLandingPage: FC = () => {
    return (

        <div className=" bg-gray-100 flex justify-center items-center">
                <AdminSlidebar/>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full">
                <h2 className="text-2xl font-semibold text-[#008FFB] mb-6 text-center">Resident Dashboard</h2>

                {/* Reusable Sidebar */}

                {/* Links to Other Pages */}
                <div className="space-y-4">
                    <div>
                        <Link
                            to="/resident/registration"
                            className="w-full block px-6 py-3 text-center text-white bg-[#008FFB] rounded-lg hover:bg-[#006fbb]"
                        >
                            Registration
                        </Link>
                    </div>
                    <div>
                        <Link
                            to="/resident/profile"
                            className="w-full block px-6 py-3 text-center text-white bg-[#008FFB] rounded-lg hover:bg-[#006fbb]"
                        >
                            View Profile
                        </Link>
                    </div>
                    <div>
                        <Link
                            to="/resident/profile-edit"
                            className="w-full block px-6 py-3 text-center text-white bg-[#008FFB] rounded-lg hover:bg-[#006fbb]"
                        >
                            Edit Profile
                        </Link>
                    </div>
                    <div>
                        <Link
                            to="/resident/forgotten-password"
                            className="w-full block px-6 py-3 text-center text-white bg-[#008FFB] rounded-lg hover:bg-[#006fbb]"
                        >
                            Forgot Password
                        </Link>
                    </div>
                    <div>
                        <Link
                            to="/resident/login"
                            className="w-full block px-6 py-3 text-center text-white bg-[#008FFB] rounded-lg hover:bg-[#006fbb]"
                        >
                            Login
                        </Link>
                    </div>
                    <div>
                        <Link
                            to="/resident/create"
                            className="w-full block px-6 py-3 text-center text-white bg-[#008FFB] rounded-lg hover:bg-[#006fbb]"
                        >
                            Create Resident
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResidentLandingPage;
