import QRCodeStyling from "qr-code-styling";
import { ensureDynamicQrUrl } from "./ensureDynamicQrUrl";
import { getBaseUrl } from "./getBaseUrl";

export const handleQRDownload = async (options: any, height: number, width: number) => {

  const modifiedSettings = {
    ...options,
    width: width || 1000,
    height: height || 1000,
  };

  if (modifiedSettings.data) {
    const baseUrl = await getBaseUrl();
    modifiedSettings.data = ensureDynamicQrUrl(modifiedSettings.data, baseUrl);
  }

  const downloadAbleQrCode = new QRCodeStyling(modifiedSettings);

  downloadAbleQrCode.download({
    extension: "png"
  });
}