import { FC, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { MdDashboard } from "react-icons/md";
import { CiPill } from "react-icons/ci";
import { FaHouseChimney } from "react-icons/fa6";
import { FaHouseUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { UserOutlined } from "@ant-design/icons";
import { HiUsers } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../../hooks/state/hooks";
import { logout } from "../../../store/slices/authSlices";

const AdminSidebar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [navbarArray, setNavbarArray] = useState<String[]>([]);

  // common css classes for nav item
  const navItemClass =
    "py-2 text-md flex items-center text-gray-700 hover:text-white rounded-md px-3";

  useEffect(() => {
    const permissions =
      user?.permissions?.map((perm) => perm.split(":")[0]) || [];

    if (permissions.length > 0) {
      setNavbarArray(permissions);
    }
  }, [user?.permissions]);

  const handleLogout = () => {
    // remove user from redux store
    dispatch(logout());
    // remove token from local storage
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const navItems = [
    {
      path: "/admin/diseases",
      label: "Diseases",
      icon: <CiPill size={25} />,
      permission: "disease",
    },
    {
      path: "/admin/households",
      label: "Households",
      icon: <FaHouseChimney size={25} />,
      permission: "household",
    },
    {
      path: "/admin/residents",
      label: "Residents",
      icon: <FaHouseUser size={25} />,
      permission: "resident",
    },
    {
      path: "/admin/clinic",
      label: "Clinic",
      icon: <FaUserDoctor size={25} />,
      permission: "clinic",
    },
    {
      path: "/admin/division",
      label: "Division",
      icon: <FaLocationDot size={25} />,
      permission: "division",
    },
    {
      path: "/admin/users",
      label: "Users",
      icon: <HiUsers size={25} />,
      permission: "user",
    },
  ];

  return (
    <div className="bg-white shadow-lg p-6 h-full fixed flex-col justify-between w-1/6 hidden md:flex">
      <h2 className="text-xl font-semibold text-[#008FFB]">RHMS</h2>
      <div>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `${navItemClass} ${
                  isActive ? "bg-[#00C1A7] text-white" : "hover:bg-[#00C1A7]"
                } `
              }
            >
              <div className="flex items-center gap-2">
                <div className="p-1">
                  <MdDashboard size={25} />
                </div>
                <div>Dashboard</div>
              </div>
            </NavLink>
          </li>

          {navItems
            .filter((item) => navbarArray.includes(item.permission))
            .map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${navItemClass} ${
                      isActive
                        ? "bg-[#00C1A7] text-white"
                        : "hover:bg-[#00C1A7]"
                    }`
                  }
                >
                  <div className="flex items-center gap-2">
                    <div className="p-1">{item.icon}</div>
                    <div>{item.label}</div>
                  </div>
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex flex-col items-center gap-4 bg-white p-2 rounded-lg shadow-sm">
        <span className="text-sm text-gray-700 font-medium">
          Hi {user?.name} ! <span className="text-blue-600"></span>
        </span>
        <Link
          to="/admin/profile"
          className="py-1 text-md flex items-center text-gray-700 hover:bg-[#566c8c] hover:text-white rounded-md px-3"
        >
          <div className="p-1">
            <UserOutlined />
          </div>
          <div>View Profile</div>
        </Link>
      </div>
      <button
        className="text-white bg-[#008FFB] hover:bg-[#3d3d6d] px-4 py-2 rounded-md text-sm transition duration-200 cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
