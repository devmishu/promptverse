import { protectedFetch } from "../core/server";


export const getReviewsByUser = async (userId) => {
    return protectedFetch(`/api/my/reviews?userId=${userId}`);
} 