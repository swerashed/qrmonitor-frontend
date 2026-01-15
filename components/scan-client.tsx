'use client';

import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { Loader2 } from 'lucide-react';
import { getQRCodeScanSettings } from '@/services/QRCodeServices';
import { scanQRCodeClient } from '@/hooks/scanQRCodeClient';

type Props = {
  qrId: string;
};

const ScanClient = ({ qrId }: Props) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const track = async () => {
      try {
        // Load FingerprintJS and start both operations in parallel
        const fpPromise = FingerprintJS.load();
        const settingsPromise = getQRCodeScanSettings(qrId);

        // Await both together
        const [fpInstance, settings] = await Promise.all([fpPromise, settingsPromise]);
        const { visitorId: fingerprint } = await fpInstance.get();

        const targetUrl = settings?.data?.qrCode?.targetUrl;

        if (!targetUrl) {
          setError('No target URL found.');
          return;
        }

        const scanRes = await scanQRCodeClient({ qrId, fingerprint });

        if (scanRes?.success) {
          window.location.href = targetUrl;
        } else {
          setError('Scan failed.');
        }
      } catch (err) {
        setError('Error during scan.');
      }
    };

    track();
  }, [qrId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-background">
      <div className="flex flex-col items-center gap-4 animate-in fade-in duration-500">
        {error ? (
          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-destructive">Oops!</h1>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : (
          <div className="relative flex items-center justify-center h-24 w-24">
            {/* Smooth CSS Spinner */}
            <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />

            {/* Ambient Glow */}
            <div className="absolute inset-0 blur-2xl bg-primary/10 animate-pulse rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanClient;
