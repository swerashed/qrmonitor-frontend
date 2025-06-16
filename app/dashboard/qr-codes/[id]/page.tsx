import QrCodeDetailsPage from "@/components/pages/dashboard-qr-details-page";
import { GetSingleQRCode } from "@/services/QRCodeServices";

export default async function SingleQrCodeDetailsPage({params}:any) {
  const id = (await params).id

  const response = await GetSingleQRCode(id);
  const data = response.data.data;
 
  return (
   <QrCodeDetailsPage data={data}/>
  );
}
