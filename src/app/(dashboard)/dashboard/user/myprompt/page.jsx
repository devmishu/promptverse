import { PromptCard } from '@/components/cards/PromptCard';
import { getPromptsByUser } from '@/lib/api/prompt';
import { getUser } from '@/lib/core/session';
import React from 'react';
import MyPromptsTable from '../../_components/MyPromptsTable';
import { revalidatePath } from 'next/cache';
import { deletePrompt } from '@/lib/actions/prompt';
import EmptyStateCard from '@/components/cards/EmptyStateCard';



const MyPromptPage = async () => {
    const user = await getUser();
    const prompts = await getPromptsByUser(user?.id);

  

    const handleDeletPrompt = async (promptId) => {
        "use server"
        await deletePrompt(promptId);
        revalidatePath('/dashboard/user/myprompt')
    }



    return (

        <div className='px-6 md:px-10 lg:px-30'>
            {
                prompts.length === 0 ? <EmptyStateCard  className="mt-50"/> :
                    <MyPromptsTable
                        prompts={prompts}
                        noHandleDeletPrompt={handleDeletPrompt}

                    />
            }

        </div>
    );
};

export default MyPromptPage;