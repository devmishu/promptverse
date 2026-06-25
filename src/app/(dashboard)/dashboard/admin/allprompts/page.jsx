
import { getAllPromptsByAdmin } from '@/lib/api/prompt';
import PromptManagementTable from '../_components/PromptManagementTable';
import { deletePrompt } from '@/lib/actions/prompt';
import { revalidatePath } from 'next/cache';
import { PaginationWithSummary } from '@/components/shared/PaginationWithSummary';


const AllPromptsPage = async ({searchParams}) => {

    const filters = await searchParams;

    const quarySearch = new URLSearchParams(filters);
    const quaryString = quarySearch.toString();

    const prompts = await getAllPromptsByAdmin(quaryString);
    const allPrompts = prompts.result;

    console.log(prompts);

    // console.log("allPrompts............................", allPrompts);

    const handleDeletPrompt = async (promptId) => {
        "use server"
        await deletePrompt(promptId);
        revalidatePath('/dashboard/admin/allprompts')

        console.log(promptId);
    }

    return (
        <div className='space-y-5'>
            {allPrompts.length}
            <PromptManagementTable
                prompts={allPrompts}
                onHandleDeletPrompt={handleDeletPrompt}
            />
            <PaginationWithSummary promptsData={allPrompts}
                total={prompts.total} />

        </div>
    );
};

export default AllPromptsPage;