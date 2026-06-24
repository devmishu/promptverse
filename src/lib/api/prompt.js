import { protectedFetch, protectedFetch2, serverFetch } from "../core/server";


export const getPromptsByUser = async (userId) => {
    return protectedFetch(`/api/my/prompts?userId=${userId}`);
}

export const getAllPromptsByAdmin = async () => {
    return protectedFetch(`/api/admin/prompts`);
}

export const getAllPrompts = async (quaryString) => {
    return serverFetch(`/api/prompts?${quaryString}`);
}
export const getFeaturedPrompts = async () => {
    return serverFetch(`/api/featured/prompts`);
}

export const getPromptById = async (id) => {
    return protectedFetch(`/api/prompts/${id}`);
}


