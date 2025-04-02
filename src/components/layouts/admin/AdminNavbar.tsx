import React from 'react'
import { useNavigate } from 'react-router';

export const AdminNavbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/resident-login');
    };
    return (
        <div className="bg-[#008FFB] p-4 flex justify-between items-center w-full">
            <h2 className="text-2xl font-semibold text-white">Resident Profile</h2>
            <div className="flex items-center">
                <span className="text-sm text-white mr-4">Ravindu (Admin)</span>
                <button
                    className="text-white border border-white rounded-md px-4 py-2 hover:bg-[#006fbb]"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}
