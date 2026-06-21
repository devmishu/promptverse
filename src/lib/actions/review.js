import { serverMutation } from "../core/server";

export const createReview = async (newReview) => {
    return serverMutation('/api/reviews', newReview);
}