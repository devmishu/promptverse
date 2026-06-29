import React from 'react';
import UserProfileCard from '../../_components/UserProfileCard';
import { getUser } from '@/lib/core/session';
import { getAllPromptsByAdmin } from '@/lib/api/prompt';

const AdminProfilePage = async () => {
    const user = await getUser()
    
    const prompts = await getAllPromptsByAdmin() || [];

    

    return (
        <div className='my-10 p-4 '>
            <UserProfileCard user={user} myPrompts={prompts.total} title={"Total Prompts"} />
        </div>
    );
};

export default AdminProfilePage;
