"use client"
import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling, { Options } from "qr-code-styling";
import { ensureDynamicQrUrl } from "@/helpers/ensureDynamicQrUrl";
import { getBaseUrl } from "@/helpers/getBaseUrl";

export default function ClientQR({ qrCodeOption, height, width }: any) {
  const [options, setOptions] = useState<Options>({ ...qrCodeOption, height: height, width: width });
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



  return (
    <>
      <div className={`flex justify-center items-center overflow-hidden h-[${height}px] w-[${width}px] object-cover`} ref={ref} />
    </>
  );
}