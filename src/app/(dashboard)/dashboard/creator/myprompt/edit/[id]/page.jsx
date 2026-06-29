import EditPrompt from '@/app/(dashboard)/dashboard/_components/EditPrompt';
import { getPromptById } from '@/lib/api/prompt';
import React, { use } from 'react';

const CreatorEditPromptPage = async ({ params }) => {
    const { id } = await params;
    
    const promptData = await getPromptById(id);


    


    return <EditPrompt
        submitBtn={"Update Prompt"}
        promptId={id}
        promptData={promptData}
    />
};

export default CreatorEditPromptPage;