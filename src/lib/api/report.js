"use server"
import { revalidatePath } from "next/cache";
import { protectedFetch, serverDelete } from "../core/server";

export const getAllReportsByAdmin = async () => {
    return protectedFetch(`/api/admin/reports`);
}

export const getWarnings = async () => {
    return protectedFetch(`/api/creator/warnings`);
}

export const deletePromptAndReports = async ({ reportId, promptId }) => {
    revalidatePath('/dashboard/admin/reported-prompts');
    return serverDelete(`/api/admin/delete-reported-prompt?reportId=${reportId}&promptId=${promptId}`);
}


