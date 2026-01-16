import QRCodeStyling, { FileExtension } from "qr-code-styling";
import { ensureDynamicQrUrl } from "./ensureDynamicQrUrl";
import { getBaseUrl } from "./getBaseUrl";

export const handleQRDownload = async (
  options: any,
  name: string = "qr-code",
  extension: FileExtension = "png",
  height: number = 1000,
  width: number = 1000
) => {
  const modifiedSettings = {
    ...options,
    width: width,
    height: height,
  };

  if (modifiedSettings.data) {
    const baseUrl = await getBaseUrl();
    modifiedSettings.data = ensureDynamicQrUrl(modifiedSettings.data, baseUrl);
  }

  const downloadAbleQrCode = new QRCodeStyling(modifiedSettings);

  await downloadAbleQrCode.download({
    name: name,
    extension: extension,
  });
};