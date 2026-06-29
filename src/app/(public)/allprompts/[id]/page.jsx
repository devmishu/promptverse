import React, { use } from 'react';
import PromptDetails from '../../_components/PromptDetails';
import { getUser } from '@/lib/core/session';
import { getPromptById } from '@/lib/api/prompt';
import { getPromptReviews } from '@/lib/api/review';

const PromptDetailsPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUser();



    const promptData = await getPromptById(id);

    const promptReviews = await getPromptReviews(id);



    return <PromptDetails
        promptId={id}
        author={user}
        promptData={promptData}
        promptReviews={promptReviews}
    />
};

export default PromptDetailsPage;