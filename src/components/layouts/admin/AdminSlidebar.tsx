import { FC } from "react";
import { Link } from "react-router"; // Ensure proper routing

const AdminSidebar: FC = () => {
    return (
        <div className="w-1/6 bg-white shadow-lg p-6">
            <h2 className="text-xl font-semibold text-[#008FFB]">Hospital Management</h2>
            <div className="mt-8">
                <ul className="space-y-4">
                    {[
                        { path: "/admin/dashboard", label: "Dashboard" },
                        { path: "/admin/diseases", label: "Diseases" },
                        { path: "/admin/households", label: "Households" },
                        { path: "/admin/residents", label: "Residents" },
                        { path: "/admin/clinic", label: "Clinic" },
                        { path: "/admin/division", label: "Division" },
                        { path: "/admin/users", label: "Users" }
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

                <Link to="/admin/login" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7] rounded-md px-3">
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default AdminSidebar;
