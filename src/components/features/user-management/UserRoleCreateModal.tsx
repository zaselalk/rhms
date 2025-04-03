import React, { FC } from 'react'
import Modal from '../../layouts/overlays/Modal'
import { PermissionCard } from './role-management/PermissionCard';

interface UserRoleCreateModalProps {
    isCreateNewRole: boolean;
    setIsCreateNewRole: (isOpen: boolean) => void;
}

export const UserRoleCreateModal: FC<UserRoleCreateModalProps> = ({ isCreateNewRole, setIsCreateNewRole }) => {
    const [permisionList, setPermissionList] = React.useState([]);
    const [roleName, setRoleName] = React.useState('');

    const handlePermissionSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id: permission, checked } = e.target;
        setPermissionList((prev: any) => {
            if (checked) {
                return [...prev, permission]
            }
            return prev.filter((perm: any) => perm !== permission)

        })
    }

    const handleRoleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setRoleName(value);
    }

    return (
        <Modal title='Create New Role' isOpen={isCreateNewRole} handleClose={() => setIsCreateNewRole(false)} >
            <div className="bg-white px-20 py-10 rounded-lg shadow-md">

                <form className="mt-4">
                    <div className="mb-4">
                        <label htmlFor="roleName" className="block text-sm font-medium text-gray-700">Role Name</label>
                        <input type="text" onChange={handleRoleNameChange} id="roleName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#008FFB] focus:border-[#008FFB] p-2" required />
                    </div>
                    <div className=" mb-4 align-top justify-around">
                        <label htmlFor="roleName" className="block text-sm font-medium text-gray-700">Permission</label>

                        <div className="flex gap-4">
                            <PermissionCard title='User'>
                                <li>
                                    <input type="checkbox" id="user:create" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="user:create">Create</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="user:edit" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="user:edit">Edit</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="user:delete" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="user:delete">Delete</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="user:view" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="user:view">View</label>
                                </li>
                            </PermissionCard>

                            <PermissionCard title='Role'>
                                <li>
                                    <input type="checkbox" id="role:create" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="role:create">Create</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="role:edit" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="role:edit">Edit</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="role:delete" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="role:delete">Delete</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="role:view" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="role:view">View</label>
                                </li>

                            </PermissionCard>

                            <PermissionCard title="Clinic">
                                <li>
                                    <input type="checkbox" id="clinic:create" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="clinic:create">Create</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="clinic:edit" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="clinic:edit">Edit</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="clinic:delete" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="clinic:delete">Delete</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="clinic:view" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="clinic:view">View</label>
                                </li>
                            </PermissionCard>

                            <PermissionCard title="Disease">
                                <li>
                                    <input type="checkbox" id="disease:create" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="disease:create">Create</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="disease:edit" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="disease:edit">Edit</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="disease:delete" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="disease:delete">Delete</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="disease:view" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="disease:view">View</label>
                                </li>
                            </PermissionCard>

                            <PermissionCard title="Division">
                                <li>
                                    <input type="checkbox" id="division:create" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="division:create">Create </label>
                                </li>
                                <li>
                                    <input type="checkbox" id="division:edit" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="division:edit">Edit</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="division:delete" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="division:delete">Delete</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="division:view" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="division:view">View</label>
                                </li>
                            </PermissionCard>

                            <PermissionCard title="HouseHold">
                                <li>
                                    <input type="checkbox" id="household:create" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="household:create">Create </label>
                                </li>
                                <li>
                                    <input type="checkbox" id="household:edit" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="household:edit">Edit </label>
                                </li>
                                <li>
                                    <input type="checkbox" id="household:delete" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="household:delete">Delete </label>
                                </li>
                                <li>
                                    <input type="checkbox" id="household:view" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="household:view">View </label>
                                </li>
                            </PermissionCard>

                            <PermissionCard title="Resident">
                                <li>
                                    <input type="checkbox" id="resident:create" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="resident:create">Create </label>
                                </li>
                                <li>
                                    <input type="checkbox" id="resident:edit" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="resident:edit">Edit</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="resident:delete" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="resident:delete">Delete</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="resident:view" className="mr-2" onChange={handlePermissionSelect} />
                                    <label htmlFor="resident:view">View</label>
                                </li>
                            </PermissionCard>

                        </div>



                    </div>

                    <div className="flex gap-2">
                        <button type="reset" className="w-full bg-red-400 text-white py-2 px-4 rounded-md ">Clear </button>
                        <button type="submit" className="w-full bg-[#008FFB] text-white py-2 px-4 rounded-md hover:bg-[#00C1A7]">Create Role</button>
                    </div>
                </form>
            </div >
        </Modal >
    )
}
