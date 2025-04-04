import { useState } from 'react';
import { FaUserCog } from 'react-icons/fa'
import { Button } from '../../Common/Button';
import { UserRoleCreateModal } from './UserRoleCreateModal';
import { useRoles } from '../../../hooks/useRoles';
import { UserRoleUpdateModal } from './UserRoleUpdateModal';


export const UserRoleset = () => {
    const [isCreateNewRole, setIsCreateNewRole] = useState(false);
    const [isUpdatingRole, setIsUpdatingRole] = useState(false);
    const [roleId, setRoleId] = useState<string>('');
    const { data: roles = [], isLoading, error } = useRoles();

    const handleRoleEdit = (roleId: string) => {
        setRoleId(roleId);
        setIsUpdatingRole(true);
    }


    return (
        <div className='col-span-4'>
            <UserRoleCreateModal isCreateNewRole={isCreateNewRole} setIsCreateNewRole={setIsCreateNewRole} />
            {roleId && <UserRoleUpdateModal isUpdatingRole={isUpdatingRole} setIsUpdatingRole={setIsUpdatingRole} roleId={roleId} />}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <Button onClick={() => setIsCreateNewRole(true)}>
                    <FaUserCog className='m-1' /> New Role
                </Button>

                {isLoading ? (
                    <p className='mt-4 text-sm text-gray-600'>Loading roles...</p>
                ) : error ? (
                    <p className='mt-4 text-sm text-red-500'>Failed to fetch roles.</p>
                ) : (
                    <table className="w-full table-auto mt-4">
                        <thead>
                            <tr>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Role</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.data && roles.data.map((role: any, index: any) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 text-sm text-gray-700">{role.role}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        <button className="text-[#008FFB] hover:text-[#00C1A7] cursor-pointer">
                                            <i className="fas fa-edit" onClick={() => handleRoleEdit(role.id)}>Edit</i>
                                        </button>
                                        <button className="ml-4 text-red-500 hover:text-red-700">
                                            <i className="fas fa-trash-alt">Delete</i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
