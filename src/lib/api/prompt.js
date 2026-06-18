import { protectedFetch } from "../core/server";


export const getPromptsByUser = async (userId) => {
    return protectedFetch(`/api/prompts?userId=${userId}`);
}