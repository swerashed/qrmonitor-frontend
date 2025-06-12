import dynamic from 'next/dynamic';
import ScanClient from '@/components/scan-client';
import { GetSingleQRCode } from '@/services/QRCodeServices';

const ScanPage = async ({ params }: { params: { id: string } }) => {
    const id = (await params).id
    const targetUrlData = await GetSingleQRCode(id)
    const targetUrl = targetUrlData?.data?.data?.qrCode?.targetUrl
    return <ScanClient qrId={id} url={targetUrl} />;
};

export default ScanPage;
