import { FC } from 'react'
import Modal from '../../layouts/overlays/Modal'

interface UserRoleCreateModalProps {
    isCreateNewRole: boolean;
    setIsCreateNewRole: (isOpen: boolean) => void;
}

export const UserRoleCreateModal: FC<UserRoleCreateModalProps> = ({ isCreateNewRole, setIsCreateNewRole }) => {

    return (
        <Modal title='Create New Role' isOpen={isCreateNewRole} handleClose={() => setIsCreateNewRole(false)}>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800">Create New Role</h2>
                <form className="mt-4">
                    <div className="mb-4">
                        <label htmlFor="roleName" className="block text-sm font-medium text-gray-700">Role Name</label>
                        <input type="text" id="roleName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#008FFB] focus:border-[#008FFB] p-2" required />
                    </div>
                    <button type="submit" className="w-full bg-[#008FFB] text-white py-2 px-4 rounded-md hover:bg-[#00C1A7]">Create Role</button>
                </form>
            </div>
        </Modal>
    )
}
