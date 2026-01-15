import { getNetworkIp } from "./getNetworkIp";

export const getApiUrl = async () => {
    const baseApi = process.env.NEXT_PUBLIC_BASE_API || "http://localhost:5000/api/v1";

    if (baseApi.includes("localhost")) {
        const ip = await getNetworkIp();
        if (ip && ip !== "localhost") {
            return baseApi.replace("localhost", ip);
        }
    }

    return baseApi;
};
