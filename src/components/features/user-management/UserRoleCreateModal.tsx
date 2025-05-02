import { FC, useRef } from 'react'
import Modal from '../../layouts/overlays/Modal'
import { PermissionCard } from './role-management/PermissionCard';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { Formik, Form, Field, FormikHelpers } from 'formik';

import * as Yup from 'yup';
import UserService from '../../../services/user.service';

interface UserRoleCreateModalProps {
    isCreateNewRole: boolean;
    setIsCreateNewRole: (isOpen: boolean) => void;
    refetch: () => void;
}

const RoleSchema = Yup.object().shape({
    roleName: Yup.string().matches(/^[A-Za-z]+$/, 'Role name can only contain letters').required('Role name is required'),
    permissionList: Yup.array().min(1, 'Select at least one permission'),
});

export const UserRoleCreateModal: FC<UserRoleCreateModalProps> = ({ isCreateNewRole, setIsCreateNewRole, refetch }) => {
    const formikHelpersRef = useRef<FormikHelpers<{ roleName: string, permissionList: string[] }> | null>(null);

    const [messageApi, contextHolder] = message.useMessage();

    const User = new UserService();

    const mutation = useMutation({
        mutationFn: async ({ roleName, permissionList }: { roleName: string, permissionList: string[] }) => {
            await User.crateUserRole(roleName, permissionList);
        },
        onSuccess: () => {
            messageApi.open({
                type: 'success',
                content: "New User Role Created!",
            });
            // setIsCreateNewRole(false);

            //reset form
            formikHelpersRef.current?.resetForm();
            refetch();

        },
        onError: (error: any) => {
            messageApi.open({
                type: 'error',
                content: error.message,
            });
        }
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

    return (
        <Modal title='Create New Role' isOpen={isCreateNewRole} handleClose={() => setIsCreateNewRole(false)}>
            <div className="bg-white px-10 py-8 rounded-lg shadow-md">
                {contextHolder}

                <Formik
                    initialValues={{ roleName: '', permissionList: [] as string[] }}
                    validationSchema={RoleSchema}
                    onSubmit={(values, helpers) => {
                        mutation.mutate(values);
                        formikHelpersRef.current = helpers;
                    }

                    }
                >
                    {({ values, handleSubmit, errors, touched, setFieldValue }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="roleName" className="block text-sm font-medium text-gray-700">Role Name</label>
                                {/* Select All */}

                                <Field
                                    type="text"
                                    name="roleName"
                                    id="roleName"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#008FFB] focus:border-[#008FFB] p-2"
                                />
                                <div className="flex items-center mb-4">
                                    <input
                                        type="checkbox"
                                        id="selectAll"
                                        checked={values.permissionList.length === allPermissions.reduce((acc, { perms }) => acc + perms.length, 0)}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            if (checked) {
                                                setFieldValue('permissionList', allPermissions.reduce((acc, { perms }) => [...acc, ...perms], []));
                                            } else {
                                                setFieldValue('permissionList', []);
                                            }
                                        }}
                                        className="mr-2"
                                    />
                                    <label htmlFor="selectAll">Select All</label>
                                </div>
                                {errors.roleName && touched.roleName && (
                                    <div className="text-red-500 text-sm mt-1">{errors.roleName}</div>
                                )}
                            </div>

                            <div className="mb-4">
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
                                                                if (checked) {
                                                                    setFieldValue('permissionList', [...values.permissionList, perm]);
                                                                } else {
                                                                    setFieldValue(
                                                                        'permissionList',
                                                                        values.permissionList.filter((item) => item !== perm)
                                                                    );
                                                                }
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
                                <button type="reset" className="flex- 1w-full bg-red-400 text-white py-2 px-4 rounded-md cursor-pointer">Clear</button>
                                <button type="submit" className="flex-3 w-full bg-[#008FFB] text-white py-2 px-4 rounded-md hover:bg-[#4f4f7e] cursor-pointer">Create Role</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
}
