import { serverFetch } from "../core/server";

export const getTopCreators = async () => {
    return serverFetch(`/api/top/creators`);
}