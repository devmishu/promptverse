"use server"
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createReview = async (promptId, newReview) => {
    revalidatePath(`/allprompts/${promptId}`);
    return serverMutation('/api/reviews', newReview);
}

