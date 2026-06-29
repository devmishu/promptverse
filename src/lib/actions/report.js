"use server"
import { revalidatePath } from "next/cache";
import { serverDelete, serverMutation } from "../core/server";

export const createReport = async (reportData) => {
    return serverMutation('/api/reports', reportData);
}

export const deleteReport = async (reportId) => {
    return serverDelete(`/api/admin/reports/${reportId}`);
}

export const warnCreator = async (reportData) => {
    
    revalidatePath('/dashboard/admin/reported-prompts');
    return serverMutation(`/api/admin/warn-creator`, reportData);

} 