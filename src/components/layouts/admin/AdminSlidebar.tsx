import { FC } from "react";
import { Link } from "react-router-dom"; // Ensure proper routing





const AdminSidebar: FC = () => {
    return (
        <div className="w-1/4 bg-white shadow-lg p-6">
            <h2 className="text-xl font-semibold text-[#008FFB]">Hospital Management</h2>
            <div className="mt-8">
                <ul className="space-y-4">
                    {[
                        { path: "/dashboard", label: "Dashboard" },
                        { path: "/diseases", label: "Diseases" },
                        { path: "/households", label: "Households" },
                        { path: "/residents", label: "Residents" },
                        { path: "/clinic", label: "Clinic" },
                        { path: "/division", label: "Division" },
                        { path: "/users", label: "Users" }
                    ].map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7] rounded-md px-3"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-8 flex items-center">
                <div className="text-sm text-gray-700">Ravindu</div>
                <div className="text-xs text-gray-500 ml-2">Admin</div>
            </div>
            <div className="mt-2">
                <button className="w-full py-2 text-white bg-[#008FFB] rounded-md hover:bg-[#006fbb]">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
