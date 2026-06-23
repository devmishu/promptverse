import React, { use } from 'react';
import PromptDetails from '../../_components/PromptDetails';
import { getUser } from '@/lib/core/session';
import { getPromptById } from '@/lib/api/prompt';
import { getPromptReviews } from '@/lib/api/review';

const PromptDetailsPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUser();

    const promptData = await getPromptById(id);
    console.log("fakePromptData", promptData);

    const promptReviews = await getPromptReviews(id)

    console.log("prompt reviews-------------",promptReviews);

    return <PromptDetails
        promptId={id}
        author={user}
        promptData={promptData}
    />
};

export default PromptDetailsPage;