"use server"

import { headers } from "next/headers";
import { auth } from "../auth";

export const updateUserRole = async (userId, role) => {

    const data = await auth.api.setRole({
        body: {
            userId: userId,
            role: role.toLowerCase(),
        },
        headers: await headers(),
    });
    return data;
}


export const deleteUser = async (userId) => {
    const data = await auth.api.removeUser({
        body: {
            userId: userId, // required
        },
        // This endpoint requires session cookies.
        headers: await headers(),
    });
    return data;
}
