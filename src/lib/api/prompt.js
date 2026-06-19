import { protectedFetch } from "../core/server";


export const getPromptsByUser = async (userId) => {
    return protectedFetch(`/api/prompts?userId=${userId}`);
}

export const getAllPrompts = async () => {
    return protectedFetch(`/api/admin/prompts`);
}

