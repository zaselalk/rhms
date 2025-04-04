import { FC, useEffect, useState } from 'react';
import Modal from '../../layouts/overlays/Modal';
import { Field, Formik, Form } from 'formik';
import { PermissionCard } from './role-management/PermissionCard';
import { message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import AuthServices from '../../../services/auth.service';
import * as Yup from 'yup';
import { useSingleRole } from '../../../hooks/useSingleRole';

interface UserRoleUpdateModalProps {
    isUpdatingRole: boolean;
    setIsUpdatingRole: (isOpen: boolean) => void;
    roleId: string;
}

const RoleSchema = Yup.object().shape({
    roleName: Yup.string().matches(/^[A-Za-z]+$/, 'Role name can only contain letters').required('Role name is required'),
    permissionList: Yup.array().min(1, 'Select at least one permission'),
});

const allPermissions = [
    { group: 'User', perms: ['user:create', 'user:edit', 'user:delete', 'user:view'] },
    { group: 'Role', perms: ['role:create', 'role:edit', 'role:delete', 'role:view'] },
    { group: 'Clinic', perms: ['clinic:create', 'clinic:edit', 'clinic:delete', 'clinic:view'] },
    { group: 'Disease', perms: ['disease:create', 'disease:edit', 'disease:delete', 'disease:view'] },
    { group: 'Division', perms: ['division:create', 'division:edit', 'division:delete', 'division:view'] },
    { group: 'HouseHold', perms: ['household:create', 'household:edit', 'household:delete', 'household:view'] },
    { group: 'Resident', perms: ['resident:create', 'resident:edit', 'resident:delete', 'resident:view'] },
];

export const UserRoleUpdateModal: FC<UserRoleUpdateModalProps> = ({ isUpdatingRole, setIsUpdatingRole, roleId }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const Auth = new AuthServices();
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

    const { data: roles, isLoading, isSuccess } = useSingleRole(roleId);

    useEffect(() => {
        if (isSuccess && roles.data) {
            try {
                const parsed = JSON.parse(roles.data.permission);
                if (Array.isArray(parsed)) {
                    setSelectedPermissions(parsed);
                }
            } catch (error) {
                console.error("Error parsing permissions", error);
            }
        }
    }, [roles, isSuccess]);

    const mutation = useMutation({
        mutationFn: async ({ roleName, permissionList }: { roleName: string, permissionList: string[] }) => {
            await Auth.updateUserRole(roleId, roleName, permissionList);
        },
        onSuccess: () => {
            messageApi.open({
                type: 'success',
                content: "User Role Updated Successfully!",
            });
            // setIsUpdatingRole(false);
        },
        onError: (error: any) => {
            messageApi.open({
                type: 'error',
                content: error.message,
            });
        }
    });

    return (
        <Modal title='Update Role' isOpen={isUpdatingRole} handleClose={() => setIsUpdatingRole(false)}>
            {contextHolder}
            {isLoading && "Loading..."}

            {!isLoading && (
                <div className="bg-white px-10 py-8 rounded-lg shadow-md">
                    <Formik
                        enableReinitialize
                        initialValues={{
                            roleName: roles.data?.role || '',
                            permissionList: selectedPermissions,
                        }}
                        validationSchema={RoleSchema}
                        onSubmit={(values) => {
                            mutation.mutate(values);
                        }}
                    >
                        {({ values, handleSubmit, errors, touched, setFieldValue }) => {
                            const flatPermissions = allPermissions.flatMap(group => group.perms);
                            const isAllSelected = values.permissionList.length === flatPermissions.length;

                            return (
                                <Form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="roleName" className="block text-sm font-medium text-gray-700">Role Name</label>
                                        <Field
                                            type="text"
                                            name="roleName"
                                            id="roleName"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#008FFB] focus:border-[#008FFB] p-2"
                                        />
                                        {errors.roleName && touched.roleName && (
                                            <div className="text-red-500 text-sm mt-1">{errors.roleName}</div>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex items-center mb-2">
                                            <input
                                                type="checkbox"
                                                id="selectAll"
                                                checked={isAllSelected}
                                                onChange={(e) => {
                                                    setFieldValue('permissionList', e.target.checked ? flatPermissions : []);
                                                }}
                                                className="mr-2"
                                            />
                                            <label htmlFor="selectAll">Select All</label>
                                        </div>

                                        <label className="block text-sm font-medium text-gray-700">Permissions</label>
                                        <div className="flex flex-wrap gap-4">
                                            {allPermissions.map(({ group, perms }) => (
                                                <PermissionCard key={group} title={group}>
                                                    {perms.map((perm) => (
                                                        <li key={perm}>
                                                            <label>
                                                                <input
                                                                    type="checkbox"
                                                                    name="permissionList"
                                                                    value={perm}
                                                                    checked={values.permissionList.includes(perm)}
                                                                    onChange={(e) => {
                                                                        const checked = e.target.checked;
                                                                        setFieldValue(
                                                                            'permissionList',
                                                                            checked
                                                                                ? [...values.permissionList, perm]
                                                                                : values.permissionList.filter(p => p !== perm)
                                                                        );
                                                                    }}
                                                                    className="mr-2"
                                                                />
                                                                {perm.split(':')[1]}
                                                            </label>
                                                        </li>
                                                    ))}
                                                </PermissionCard>
                                            ))}
                                        </div>
                                        {errors.permissionList && touched.permissionList && (
                                            <div className="text-red-500 text-sm mt-1">{errors.permissionList}</div>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <button type="reset" className="w-full bg-red-400 text-white py-2 px-4 rounded-md">Clear</button>
                                        <button type="submit" className="w-full bg-[#008FFB] text-white py-2 px-4 rounded-md hover:bg-[#00C1A7]">
                                            Update Role
                                        </button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            )}
        </Modal>
    );
};
