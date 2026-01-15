"use server"
import os from "os";

export const getNetworkIp = async () => {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        const addresses = interfaces[interfaceName];
        if (addresses) {
            for (const address of addresses) {
                if (address.family === "IPv4" && !address.internal) {
                    return address.address;
                }
            }
        }
    }
    return "localhost";
};
