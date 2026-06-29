import { getAllReportsByAdmin } from '@/lib/api/report';
import React from 'react';
import AdminReportedPromptTable from '../_components/AdminReportedPromptTable';
import { deleteReport } from '@/lib/actions/report';
import { revalidatePath } from 'next/cache';
import { deletePrompt } from '@/lib/actions/prompt';
import toast from 'react-hot-toast';
import EmptyStateCard from '@/components/cards/EmptyStateCard';

const ReportedPromptsPage = async () => {
    const reports = await getAllReportsByAdmin();
   

    const handleDismiss = async (reportId) => {
        "use server"
        await deleteReport(reportId)
        revalidatePath('dashboard/admin/reported-prompts')
       
    }


    const handleDeletePrompt = async (promptId) => {
        "use server"

        try {
            const response = await deletePrompt(promptId);
            if (response.success) {
                toast.success("Prompt Delete successfully!");
                revalidatePath('/dashboard/admin/reported-prompts');


            } else {
                toast.error(response.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }

    }




    return (
        <div className='p-4 sm:mt-5'>

            {
                reports.length === 0 ? <EmptyStateCard className={`mt-50`}/> :
                    <AdminReportedPromptTable
                        reports={reports}
                        onHandleDismiss={handleDismiss}
                        onHandleDeletePrompt={handleDeletePrompt}
                    />
            }

        </div>
    );
};

export default ReportedPromptsPage;