import React from 'react';
import { getUser } from '@/lib/core/session';
import UserProfileCard from '../../_components/UserProfileCard';
import { getPromptsByUser } from '@/lib/api/prompt';

const UserProfilePage = async () => {
    const user = await getUser()
    console.log("profile user---", user);
    const myPrompts = await getPromptsByUser(user?.id) || [];
    return (
        <div className='my-10 mr-10'>
            <UserProfileCard user={user} myPrompts={myPrompts.length} title="My Prompts Published" />
        </div>
    );
};

export default UserProfilePage;
