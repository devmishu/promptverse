import React from 'react';
import UserManagementTable from '../_components/UserManagementTable';
import { getUsersList } from '@/lib/api/allusers';
import { deleteUser, updateUserRole } from '@/lib/actions/users';
import { revalidatePath } from 'next/cache';

const AllUsersPage = async () => {
    const data = await getUsersList();
    const usersData = data?.users || [];

  

    const handleChangeRole = async (userId, newRole) => {
        "use server"
        await updateUserRole(userId, newRole);
        revalidatePath('/dashboard/admin/allusers');

       
    };

    const handleDeleteUser = async (userId) => {
        "use server"
        await deleteUser(userId);
        revalidatePath('/dashboard/admin/allusers');

        
    };
    return (
        <div className='p-4 sm:mt-5'>
            <UserManagementTable 
                users={usersData}
                onHandleChangeRole={handleChangeRole}
                onHandleDeleteUser={handleDeleteUser}
            />
        </div>
    );
};

export default AllUsersPage;