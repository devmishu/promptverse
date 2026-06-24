import { getAllReportsByAdmin } from '@/lib/api/report';
import React from 'react';
import AdminReportedPromptTable from '../_components/AdminReportedPromptTable';
import { deleteReport } from '@/lib/actions/report';
import { revalidatePath } from 'next/cache';

const ReportedPromptsPage = async () => {
    const reports = await getAllReportsByAdmin();
    console.log("reports....", reports);

    const handleDismiss = async (reportId) => {
        "use server"
        await deleteReport(reportId)
        revalidatePath('dashboard/admin/reported-prompts')
        console.log("reportId..", reportId);
    }

    const handleDeleteBookmark = async (bookmarkId) => {
        "use server"
        await deleteBookmark(bookmarkId);


    }

    return (
        <div>
            <AdminReportedPromptTable
                reports={reports}
                onHandleDismiss={handleDismiss}
            />
        </div>
    );
};

export default ReportedPromptsPage;