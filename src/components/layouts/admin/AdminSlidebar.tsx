import { FC } from "react";
import { Link, NavLink } from "react-router";
import { MdDashboard } from "react-icons/md";
import { CiPill } from "react-icons/ci";
import { FaHouseChimney } from "react-icons/fa6";
import { FaHouseUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";

const AdminSidebar: FC = () => {
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
            <div className="flex items-center">
                <span className="text-sm mr-4">Ravindu (Admin)</span>
                <Link to="/admin/profile">Profile</Link>
                <button
                    className=" rounded-md px-4 py-2 hover:bg-[#006fbb]"
                // onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
