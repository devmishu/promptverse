
import { getPromptsByUser } from '@/lib/api/prompt';
import { getUser } from '@/lib/core/session';
import { revalidatePath } from 'next/cache';
import { deletePrompt } from '@/lib/actions/prompt';
import MyPromptsTable from '../../_components/MyPromptsTable';
import EmptyStateCard from '@/components/cards/EmptyStateCard';
import toast from 'react-hot-toast';


const CreatorMyPromptPage = async () => {
    const user = await getUser();
    const prompts = await getPromptsByUser(user?.id);

   

    const handleDeletPrompt = async (promptId) => {
        "use server"
        await deletePrompt(promptId);
        revalidatePath('/dashboard/user/myprompt');


       
    }



    return (

        <div>
            {
                prompts.length === 0 ? <EmptyStateCard className={`mt-50`} /> :
                    <MyPromptsTable
                        prompts={prompts}
                        noHandleDeletPrompt={handleDeletPrompt}
                    />
            }

        </div>
    );
};

export default CreatorMyPromptPage;