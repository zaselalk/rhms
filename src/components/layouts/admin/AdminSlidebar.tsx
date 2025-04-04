import { FC } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { MdDashboard } from "react-icons/md";
import { CiPill } from "react-icons/ci";
import { FaHouseChimney } from "react-icons/fa6";
import { FaHouseUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";

const AdminSidebar: FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/admin/login');
    };
    return (
        <div className="bg-white shadow-lg p-6 h-full fixed flex-col justify-between w-1/6 hidden md:flex">
            <h2 className="text-xl font-semibold text-[#008FFB]">RHMS</h2>
            <div >
                <ul className="space-y-4">
                    {[
                        { path: "/admin/dashboard", label: "Dashboard", icon: <MdDashboard size={35} /> },
                        { path: "/admin/diseases", label: "Diseases", icon: <CiPill size={30} /> },
                        { path: "/admin/households", label: "Households", icon: <FaHouseChimney size={30} /> },
                        { path: "/admin/residents", label: "Residents", icon: <FaHouseUser size={30} /> },
                        { path: "/admin/clinic", label: "Clinic", icon: <FaUserDoctor size={30} /> },
                        { path: "/admin/division", label: "Division", icon: <FaLocationDot size={30} /> },
                        { path: "/admin/users", label: "Users", icon: <HiUsers size={30} /> },
                        { path: "/admin/profile", label: "Profile", icon: <FaCircleUser size={30} /> },

                    ].map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `py-1 text-md flex items-center text-gray-700 ${isActive ? "bg-[#00C1A7] text-white" : "hover:bg-[#00C1A7]"} rounded-md px-3`
                                }
                            >
                                <div className="p-1">
                                    {item.icon}
                                </div>
                                <div>
                                    {item.label}
                                </div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center gap-4 bg-white p-2 rounded-lg shadow-sm">
                <span className="text-sm text-gray-700 font-medium">
                    Asela <span className="text-blue-600">(Admin)</span>
                </span>

                <button
                    className="text-white bg-[#008FFB] hover:bg-[#006fbb] px-4 py-2 rounded-md text-sm transition duration-200"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

        </div>
    );
};

export default AdminSidebar;
