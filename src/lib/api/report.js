import { protectedFetch } from "../core/server";

export const getAllReportsByAdmin = async () => {
    return protectedFetch(`/api/admin/reports`);
}