import React, { use } from 'react';
import PromptDetails from '../../_components/PromptDetails';
import { getUser } from '@/lib/core/session';
import { getPromptById } from '@/lib/api/prompt';

const PromptDetailsPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUser();
    const promptData = await getPromptById(id);
    console.log("fakePromptData", promptData);

    return <PromptDetails 
        promptId={id}
        author={user}
        promptData={promptData}
    />
};

export default PromptDetailsPage;