
import { serverDelete, serverMutation } from "../core/server";

export const createBookmark = async (newPrompt) => {
    return serverMutation('/api/bookmarks', newPrompt);
}

export const deleteBookmark = async (bookmarkId) => {
    return serverDelete(`/api/bookmarks/${bookmarkId}`);
} 