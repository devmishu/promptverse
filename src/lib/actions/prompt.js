"use server"
import { serverDelete, serverMutation } from "../core/server";

export const createprompt = async (newPrompt) => {
    return serverMutation('/api/prompts', newPrompt);
}

export const deletePrompt = async (promptId) => {
    return serverDelete(`/api/prompt/${promptId}`);
}