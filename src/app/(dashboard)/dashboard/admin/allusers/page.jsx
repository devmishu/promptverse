import React from 'react';
import UserManagementTable from '../_components/UserManagementTable';
import { getUsersList } from '@/lib/api/allusers';
import { deleteUser, updateUserRole } from '@/lib/actions/users';
import { revalidatePath } from 'next/cache';

const AllUsersPage = async () => {
    const data = await getUsersList();
    const usersData = data?.users || [];

    console.log("admin user....", usersData);

    const handleChangeRole = async (userId, newRole) => {
        "use server"
        await updateUserRole(userId, newRole);
        revalidatePath('/dashboard/admin/allusers');

        console.log("new role.........", newRole);
    };

    const handleDeleteUser = async (userId) => {
        "use server"
        await deleteUser(userId);
        revalidatePath('/dashboard/admin/allusers');

        console.log("new role.........", userId);
    };
    return (
        <div>
            <UserManagementTable
                users={usersData}
                onHandleChangeRole={handleChangeRole}
                onHandleDeleteUser={handleDeleteUser}
            />
        </div>
    );
};

export default AllUsersPage;