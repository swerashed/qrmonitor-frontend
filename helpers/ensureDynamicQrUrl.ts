export const ensureDynamicQrUrl = (qrData: string, currentOrigin: string) => {
    if (!qrData || !qrData.includes("/scan/")) return qrData;
    try {
        const url = new URL(qrData);
        const originUrl = new URL(currentOrigin);
        url.host = originUrl.host;
        url.protocol = originUrl.protocol;
        return url.toString();
    } catch (e) {
        return qrData;
    }
};
