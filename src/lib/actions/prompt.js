"use server"
import { revalidatePath } from "next/cache";
import { serverDelete, serverMutation } from "../core/server";

export const createprompt = async (newPrompt) => {
    return serverMutation('/api/prompts', newPrompt);
}




export const deletePrompt = async (promptId) => {
    revalidatePath('/dashboard/admin/allprompts')
    return serverDelete(`/api/prompt/${promptId}`);

}

export const editPrompt = async (promptId, updatedData) => {
    revalidatePath('/dashboard/user/myprompt')
    return serverMutation(`/api/prompts/${promptId}`, updatedData, "PATCH");
}
export const approvedPrompt = async (promptId) => {
    const apiData = { status: "approved" };
    revalidatePath('/dashboard/admin/allprompts')
    return serverMutation(`/api/admin/prompts/${promptId}/status`, apiData, "PATCH");
}

export const rejectPrompt = async (promptId, feedbackReason) => {
    const apiData = { reason: feedbackReason };
    revalidatePath('/dashboard/admin/allprompts')
    return serverMutation(`/api/admin/prompts/${promptId}/reject`, apiData, "PATCH");
}

export const featurePrompt = async (promptId) => {
    const apiData = { isFeatured: true };
    revalidatePath('/dashboard/admin/allprompts')
    return serverMutation(`/api/admin/prompts/${promptId}/featured/`, apiData, "PATCH");
}

