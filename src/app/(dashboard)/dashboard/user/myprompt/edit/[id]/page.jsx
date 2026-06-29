import React, { use } from 'react';
import EditPrompt from '../../../../_components/EditPrompt';
import { getPromptById } from '@/lib/api/prompt';

const EditPromptPage = async ({ params }) => {
    const { id } = await params;
    
    const promptData = await getPromptById(id);

    return <EditPrompt
        submitBtn={"Update Prompt"}
        promptId={id}
        promptData={promptData}
    />
};

export default EditPromptPage;