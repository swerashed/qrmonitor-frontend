import { getNetworkIp } from "./getNetworkIp";

export const getBaseUrl = async () => {
    if (typeof window !== "undefined") {
        let origin = window.location.origin;
        // If accessing via localhost, we want the QR code to use the actual IP for scan-ability
        if (origin.includes("localhost")) {
            const ip = await getNetworkIp();
            if (ip && ip !== "localhost") {
                return origin.replace("localhost", ip);
            }
        }
        return origin;
    }

    try {
        const { headers } = await import("next/headers");
        const headersList = await headers();
        let host = headersList.get("host") || ""; // e.g., localhost:3000
        const protocol = headersList.get("x-forwarded-proto") || "http";

        if (host.includes("localhost")) {
            const ip = await getNetworkIp();
            if (ip && ip !== "localhost") {
                host = host.replace("localhost", ip);
            }
        }

        return `${protocol}://${host}`;
    } catch (error) {
        return process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
    }
};
