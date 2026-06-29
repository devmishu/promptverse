
import { getAllPromptsByAdmin } from '@/lib/api/prompt';
import PromptManagementTable from '../_components/PromptManagementTable';
import { approvedPrompt, deletePrompt, featurePrompt, rejectPrompt } from '@/lib/actions/prompt';
import { revalidatePath } from 'next/cache';
import { PaginationWithSummary } from '@/components/shared/PaginationWithSummary';
import { toast } from 'react-hot-toast';
import EmptyStateCard from '@/components/cards/EmptyStateCard';


const AllPromptsPage = async ({ searchParams }) => {

    const filters = await searchParams;

    const quarySearch = new URLSearchParams(filters);
    const quaryString = quarySearch.toString();

    const prompts = await getAllPromptsByAdmin(quaryString);
    const allPrompts = prompts.result;

    return (
        <>
            {
                prompts.length === 0 ? <EmptyStateCard className={`mt-50`} /> :
                    <div className='space-y-5 p-4 sm:mt-5 '>

                        <PromptManagementTable
                            prompts={allPrompts}

                        />
                        <PaginationWithSummary promptsData={allPrompts}
                            total={prompts.total} />

                    </div>
            }
        </>

    );
};

export default AllPromptsPage;
