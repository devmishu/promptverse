import React, { use } from 'react';
import EditPrompt from '../../../../_components/EditPrompt';

const EditPromptPage = ({ params }) => {
    const { id } = use(params);
    console.log("edit page id...", id);



    return <EditPrompt
        submitBtn={"Update Prompt"}
        promptId={id}
    />
};

export default EditPromptPage;