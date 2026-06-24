import React from 'react';
import UserProfileCard from '../../_components/UserProfileCard';
import { getUser } from '@/lib/core/session';

const AdminProfilePage = async () => {
    const user = await getUser()
    console.log("profile user---",user);

    return (
        <div className='my-10 mr-10'>
            <UserProfileCard user={user}/>
        </div>
    );
};

export default AdminProfilePage;
