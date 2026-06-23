import { serverMutation } from "../core/server";

export const createSubscription = async (newSubscription) => {
    return serverMutation('/api/subscriptions', newSubscription);
}

