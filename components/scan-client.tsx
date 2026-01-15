'use client';

import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { getQRCodeScanSettings } from '@/services/QRCodeServices';
import { getApiUrl } from '@/helpers/getApiUrl';

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
          setError('No target URL found for this QR code.');
          return;
        }

        // Fire tracking request and AWAIT confirmation to ensure accuracy
        // Since geolocation is backgrounded on the server, this response will be very fast
        const baseUrl = await getApiUrl();
        const apiUrl = `${baseUrl}/qr-code/track-scan`;

        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ qrId, fingerprint }),
            keepalive: true,
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${response.status}`);
          }
        } catch (fetchErr: any) {
          console.error("Tracking request failed:", fetchErr);
          // If we're in development, we want to know why it failed (likely localhost issue)
          if (process.env.NODE_ENV === 'development') {
            setError(`Tracking Failed: ${fetchErr.message}. Check if your API URL (${apiUrl}) is accessible from your mobile device.`);
            return;
          }
          // In production, we might still want to redirect if the tracking fails but it's not ideal
          // For now, let's show an error to be safe as per user request for "full accuracy"
          setError("Failed to record scan. Please try again.");
          return;
        }

        // Redirect only after tracking is confirmed
        window.location.href = targetUrl;
      } catch (err: any) {
        console.error("Scan processing error:", err);
        setError(process.env.NODE_ENV === 'development' ? `Error: ${err.message}` : "An error occurred while processing your scan.");
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
