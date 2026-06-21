import { protectedFetch } from "../core/server";



export const getBookmarksByUser = async (userId) => {
    return protectedFetch(`/api/my/bookmarks?userId=${userId}`);
}