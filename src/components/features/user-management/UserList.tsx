import { FaUserPlus } from 'react-icons/fa6'
import { useState } from 'react'
import { UserCreateModal } from './UserCreateModal';
import { Button } from '../../Common/Button';

export const UserList = () => {
    const [isCreateUser, setIsCreateUser] = useState(false);
    const [userList, setUserList] = useState([
        { name: "Asela Priyadarshana", role: "Surgeon" },
        { name: "Nimasha Jayasinghe", role: "Pediatrician" },
        { name: "Ravindu Madushanka", role: "Radiologist" },
        { name: "Dilukshi Perera", role: "Lab Technician" },
        { name: "Tharindu Silva", role: "Pharmacist" },
        { name: "Sanduni Weerasinghe", role: "Matron" },
        { name: "Chamika Fernando", role: "Medical Officer" },
        { name: "Isuru Rathnayake", role: "Emergency Responder" },
        { name: "Shanali Gunasekara", role: "Physiotherapist" },
        { name: "Malith Gamage", role: "Biomedical Engineer" },
        { name: "Hiruni Ranasinghe", role: "Receptionist" },
        { name: "Pasindu Jayalath", role: "Ward Attendant" },
        { name: "Gayani Dissanayake", role: "Infection Control Nurse" },
        { name: "Niroshan De Alwis", role: "Anesthesiologist" },
        { name: "Kavindya Senanayake", role: "Nutritionist" }
    ]);


    return (
        <>
            <UserCreateModal isOpen={isCreateUser} handleClose={() => setIsCreateUser(false)} />
            <div className='col-span-8'>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <Button onClick={() => setIsCreateUser(true)}><FaUserPlus className='m-1' /> New User</Button>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Name</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Role</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList && userList.map((person, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 text-sm text-gray-700">{person.name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{person.role}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        <button className="text-[#008FFB] hover:text-[#00C1A7]">
                                            <i className="fas fa-edit">Edit</i>
                                        </button>
                                        <button className="ml-4 text-red-500 hover:text-red-700">
                                            <i className="fas fa-trash-alt">Delete</i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div></>
    )
}
