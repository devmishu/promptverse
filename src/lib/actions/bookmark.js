import { serverMutation } from "../core/server";

export const createBookmark = async (newPrompt) => {
    return serverMutation('/api/bookmarks', newPrompt);
}