import { serverMutation } from "../core/server";

export const createReport = async (reportData) => {
    return serverMutation('/api/reports', reportData);
}