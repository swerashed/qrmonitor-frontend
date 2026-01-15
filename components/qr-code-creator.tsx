"use client"
import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import QRCodeStyling, { Options, FileExtension } from "qr-code-styling";
import { ensureDynamicQrUrl } from "@/helpers/ensureDynamicQrUrl";
import { getBaseUrl } from "@/helpers/getBaseUrl";

export default function ClientQR({ qrCodeOption, height, width }: any) {
  const [options, setOptions] = useState<Options>({ ...qrCodeOption, height: height, width: width });
  const [fileExt, setFileExt] = useState<FileExtension>("svg");
  const [qrCode, setQrCode] = useState<QRCodeStyling>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQrCode(new QRCodeStyling(options));
  }, [])

  useEffect(() => {
    if (ref.current) {
      qrCode?.append(ref.current);
    }
  }, [qrCode, ref]);

  // Update options when props change
  useEffect(() => {
    const updateOptions = async () => {
      const dynamicOptions = { ...qrCodeOption, height: height, width: width };
      if (dynamicOptions.data) {
        const baseUrl = await getBaseUrl();
        dynamicOptions.data = ensureDynamicQrUrl(dynamicOptions.data, baseUrl);
      }
      setOptions(dynamicOptions);
    };
    updateOptions();
  }, [qrCodeOption, height, width]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode?.update(options);
  }, [qrCode, options]);



  const onExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFileExt(event.target.value as FileExtension);
  };

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({
      extension: fileExt
    });
  };

  return (
    <>
      <div className={`flex justify-center items-center overflow-hidden h-[${height}px] w-[${width}px] object-cover`} ref={ref} />
      {/* <div >
        <input value={options.data} onChange={onDataChange} />
        <select onChange={onExtensionChange} value={fileExt}>
          <option value="svg">SVG</option>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </select>
        <button onClick={onDownloadClick}>Download</button>
      </div> */}
    </>
  );
}