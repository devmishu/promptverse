
import { getAllPromptsByAdmin } from '@/lib/api/prompt';
import PromptManagementTable from '../_components/PromptManagementTable';
import { approvedPrompt, deletePrompt, featurePrompt, rejectPrompt } from '@/lib/actions/prompt';
import { revalidatePath } from 'next/cache';
import { PaginationWithSummary } from '@/components/shared/PaginationWithSummary';
import toast from 'react-hot-toast';


const AllPromptsPage = async ({ searchParams }) => {

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

    const handleApprove = async (promptId) => {
        "use server"
        await approvedPrompt(promptId);
        // revalidatePath('/dashboard/admin/allprompts')

        console.log(promptId);
    };

    const handleReject = async (promptId, reasonText) => {
        "use server"
        try {
            // অ্যাকশন ফাংশনটি কল করা হলো এবং রিজন পাস করা হলো
            const response = await rejectPrompt(promptId, reasonText);

            if (response.success) {
                toast.success("Prompt rejected successfully!");
            } else {
                toast.error(response.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleFeatured = async (promptId, reasonText) => {
        "use server"
        try {
            // অ্যাকশন ফাংশনটি কল করা হলো এবং রিজন পাস করা হলো
            const response = await featurePrompt(promptId);

            if (response.success) {
                toast.success("reatured successfully!");
            } else {
                toast.error(response.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div className='space-y-5 p-4 sm:mt-5 '>
            
            <PromptManagementTable
                prompts={allPrompts}
                onHandleDeletPrompt={handleDeletPrompt}
                onHandleApprove={handleApprove}
                onHandleReject={handleReject}
                onHandleFeatured={handleFeatured}
            />
            <PaginationWithSummary promptsData={allPrompts}
                total={prompts.total} />

        </div>
    );
};

export default AllPromptsPage;