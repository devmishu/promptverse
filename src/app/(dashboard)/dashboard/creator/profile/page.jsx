import React from 'react';
import { getUser } from '@/lib/core/session';
import UserProfileCard from '../../_components/UserProfileCard';

const CreatorProfilePage = async () => {
    const user = await getUser()
    console.log("profile user---", user);

    return (
        <div className='my-10 mr-10'>
            <UserProfileCard user={user} />
        </div>
    );
};

export default CreatorProfilePage;
