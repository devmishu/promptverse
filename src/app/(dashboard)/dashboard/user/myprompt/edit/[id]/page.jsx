import React, { use } from 'react';
import EditPrompt from '../../../_components/EditPrompt';

const EditPromptPage = ({ params }) => {
    const { id } = use(params);
    console.log("edit page id...", id);

    const handleEditMPrompt = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData.entries());

        const { data: tokenData } = await authClient.token()

        try {
            const data = await carService.editMyCar(id, updatedData, tokenData);
            toast.success(`${data.message}`);


            revalidateAnyPath("/manage-cars/myaddedcars");
            router.push("/manage-cars/myaddedcars");
        } catch (error) {
            console.error(error);
            toast.error(`${data.message}`);
        }
    };


    return <EditPrompt 
    submitBtn={"Update Prompt"}
    promptId={id}
     />
};

export default EditPromptPage;