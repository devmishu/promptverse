"use server"
import { revalidatePath } from "next/cache";
import { serverDelete, serverMutation } from "../core/server";

export const createprompt = async (newPrompt) => {
    return serverMutation('/api/prompts', newPrompt);
}

export const deletePrompt = async (promptId) => {
    return serverDelete(`/api/prompt/${promptId}`);
}

export const editPrompt = async (promptId, updatedData) => {
    revalidatePath('/dashboard/user/myprompt')
    return serverMutation(`/api/prompts/${promptId}`, updatedData, "PATCH");
}