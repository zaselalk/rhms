import React from "react";
import { useNavigate } from "react-router";

export const AdminNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // remove token from local storage
    localStorage.removeItem("token");
    // navigate("/resident-login");
  };
  return (
    <>
      <div className="text-cyan-700  flex justify-between items-center w-full">
        <h2 className="text-md font-semibold">Resident Profile</h2>
        <div className="flex items-center">
          <span className="text-sm mr-4">Ravindu (Admin)</span>
          <button
            className=" rounded-md px-4 py-2 hover:bg-[#006fbb]"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <hr className="mt-4" />
    </>
  );
};
