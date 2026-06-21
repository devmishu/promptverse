import { getAllReportsByAdmin } from '@/lib/api/report';
import React from 'react';

const ReportedPromptsPage = async () => {
    const reports = await getAllReportsByAdmin();
    console.log("reports....", reports);
    return (
        <div>
            Reported Prompts Page {""}
        </div>
    );
};

export default ReportedPromptsPage;