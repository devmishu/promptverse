
import { getAllPromptsByAdmin } from '@/lib/api/prompt';
import PromptManagementTable from '../_components/PromptManagementTable';
import { deletePrompt } from '@/lib/actions/prompt';
import { revalidatePath } from 'next/cache';


const AllPromptsPage = async () => {

    const allPrompts = await getAllPromptsByAdmin();
    console.log("allPrompts............................", allPrompts);

    const handleDeletPrompt = async (promptId) => {
        "use server"
        await deletePrompt(promptId);
        revalidatePath('/dashboard/admin/allprompts')

        console.log(promptId);
    }

    return (
        <div>
            <PromptManagementTable
                prompts={allPrompts}
                onHandleDeletPrompt={handleDeletPrompt}
            />
        </div>
    );
};

export default AllPromptsPage;