import QRCodeStyling from "qr-code-styling";

export const handleQRDownload = (options:any, height:number, width:number) => {
  
    const modifiedSettings = {
      ...options,
      width: width || 1000,
      height: height || 1000, 
    };
  
    const downloadAbleQrCode = new QRCodeStyling(modifiedSettings);
  
    downloadAbleQrCode.download({
      extension: "png"
    });
  }