import { serverDelete, serverMutation } from "../core/server";

export const createReport = async (reportData) => {
    return serverMutation('/api/reports', reportData);
}

export const deleteReport = async (reportId) => {
    return serverDelete(`/api/admin/reports/${reportId}`);
} 