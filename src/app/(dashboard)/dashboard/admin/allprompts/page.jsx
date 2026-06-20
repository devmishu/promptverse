
import { getAllPromptsByAdmin } from '@/lib/api/prompt';
import PromptManagementTable from '../_components/PromptManagementTable';


const AllPromptsPage = async () => {

    const allPrompts = await getAllPromptsByAdmin();
    console.log("allPrompts............................", allPrompts);
    return (
        <div>
            <PromptManagementTable
                prompts={allPrompts}
            />
        </div>
    );
};

export default AllPromptsPage;