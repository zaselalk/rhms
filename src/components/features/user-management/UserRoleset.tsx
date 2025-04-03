import { useState } from 'react';
import { FaUserCog } from 'react-icons/fa'
import { Button } from '../../Common/Button';
import { UserRoleCreateModal } from './UserRoleCreateModal';

export const UserRoleset = () => {

    const [roles, setRoles] = useState([
        "Doctor",
        "Nurse",
        "Surgeon",
        "Pediatrician",
        "Radiologist",
        "Lab Technician",
        "Pharmacist",
        "Matron",
        "Medical Officer",
        "Emergency Responder",
        "Physiotherapist",
        "Biomedical Engineer",
        "Receptionist",
        "Ward Attendant",
        "Infection Control Nurse",
        "Anesthesiologist",
        "Nutritionist"
    ]);

    const [isCreateNewRole, setIsCreateNewRole] = useState(false);


    return (
        <div className='col-span-4'>
            <UserRoleCreateModal isCreateNewRole={isCreateNewRole} setIsCreateNewRole={setIsCreateNewRole} />
            <div className="bg-white p-6 rounded-lg shadow-md">
                <Button onClick={() => setIsCreateNewRole(true)}> <FaUserCog className='m-1' /> New Role</Button>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="text-left px-4 py-2 text-sm text-gray-600">Role</th>
                            <th className="text-left px-4 py-2 text-sm text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles && roles.map((role, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 text-sm text-gray-700">{role}</td>
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
        </div>
    )
}
