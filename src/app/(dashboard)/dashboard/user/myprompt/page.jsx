import { PromptCard } from '@/components/cards/PromptCard';
import { getPromptsByUser } from '@/lib/api/prompt';
import { getUser } from '@/lib/core/session';
import React from 'react';
import MyPromptsTable from '../_components/MyPromptsTable';
import { revalidatePath } from 'next/cache';
import { deletePrompt } from '@/lib/actions/prompt';



const MyPromptPage = async () => {
    const user = await getUser();
    const prompts = await getPromptsByUser(user?.id);

    console.log("myprompts..........", prompts, user);

    const handleDeletPrompt = async (promptId) => {
        "use server"
        await deletePrompt(promptId);
        revalidatePath('/dashboard/user/myprompt')

        console.log(promptId);
    }



    return (

        <div>
            <MyPromptsTable
                prompts={prompts}
                noHandleDeletPrompt={handleDeletPrompt}
            />
        </div>
    );
};

export default MyPromptPage;