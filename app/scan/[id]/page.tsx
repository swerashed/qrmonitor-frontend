import dynamic from 'next/dynamic';
import ScanClient from '@/components/scan-client';

const ScanPage = async ({ params }: { params: { id: string } }) => {
    const id = (await params).id
    return <ScanClient qrId={id} />;
};

export default ScanPage;
