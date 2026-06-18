"use server"
import { serverMutation } from "../core/server";

export const createprompt = async (newPrompt) => {
    return serverMutation('/api/prompts', newPrompt);
}