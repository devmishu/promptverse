import React from 'react';
import { getUser } from '@/lib/core/session';
import UserProfileCard from '../../_components/UserProfileCard';
import { getPromptsByUser } from '@/lib/api/prompt';
import { getWarnings } from '@/lib/api/report';

const CreatorProfilePage = async () => {
    const user = await getUser()
    
    const myPrompts = await getPromptsByUser(user?.id) || [];
    const warnings = await getWarnings() || [];
    return (
        <div className='my-10 mr-10'>
            <UserProfileCard
                user={user}
                myPrompts={myPrompts.length}
                title="Total Prompts"
                warnings={warnings}
            />
        </div>
    );
};

export default CreatorProfilePage;
