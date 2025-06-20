'use client';

import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { getQRCodeScanSettings, scanQRCode } from '@/services/QRCodeServices';

type Props = {
  qrId: string;
};

const ScanClient = ({ qrId }: Props) => {
  const [status, setStatus] = useState('Preparing scan...');

  useEffect(() => {
    const track = async () => {
      try {
        setStatus('Redirecting...');

        // Load FingerprintJS and start both operations in parallel
        const fpPromise = FingerprintJS.load();
        const settingsPromise = getQRCodeScanSettings(qrId);

        setStatus('Redirecting...');

        // Await both together
        const [fpInstance, settings] = await Promise.all([fpPromise, settingsPromise]);
        const { visitorId: fingerprint } = await fpInstance.get();

        const targetUrl = settings?.data?.qrCode?.targetUrl;

        if (!targetUrl) {
          setStatus('No target URL found.');
          return;
        }

        setStatus('Redirecting...');
        const scanRes = await scanQRCode({ qrId, fingerprint });

        if (scanRes?.success) {
          setStatus('Redirecting...');
          setTimeout(() => {
            window.location.href = targetUrl;
          }, 300); // Small delay for UX
        } else {
          setStatus('Scan failed.');
        }
      } catch (err) {
        console.error(err);
        setStatus('Error during scan.');
      }
    };

    track();
  }, [qrId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-xl font-bold">QR Scan In Progress</h1>
      <p className="mt-2 animate-pulse">{status}</p>
    </div>
  );
};

export default ScanClient;
