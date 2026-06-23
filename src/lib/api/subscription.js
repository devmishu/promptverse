import { protectedFetch } from "../core/server";

export const getAllSubscriptionsByAdmin = async () => {
    return protectedFetch(`/api/admin/subscriptions`);
} 