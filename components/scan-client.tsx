'use client';

import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { scanQRCode } from '@/services/QRCodeServices';

type Props = {
  qrId: string;
  url: string 
};

const ScanClient = ({ qrId, url }: Props) => {
  const [status, setStatus] = useState('Preparing scan...');

  useEffect(() => {
    const track = async () => {
      setStatus('Generating fingerprint...');
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const fingerprint = result.visitorId;

      try {
        setStatus('Tracking scan...');
        const res = await scanQRCode({ qrId, fingerprint });

        if (res?.success) {
          setStatus('Redirecting...');
          const target = url;
          if (target) {
            window.location.href = target;
          } else {
            setStatus('No redirect URL found.');
          }
        } else {
          setStatus('Scan failed');
        }
      } catch (err) {
        console.error(err);
        setStatus('Error during scan');
      }
    };

    track();
  }, [qrId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-xl font-bold">QR Scan In Progress</h1>
      <p className="mt-2">{status}</p>
    </div>
  );
};

export default ScanClient;
