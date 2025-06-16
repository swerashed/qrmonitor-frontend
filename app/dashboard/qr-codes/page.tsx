import DashboardQrCodesPage from '@/components/pages/dashboard-qr-code-page'
import { GetAllQRCode } from '@/services/QRCodeServices'


const QrCodePage = async () => {

  const response = await GetAllQRCode()
  const qrCodeData = response.data

  return (
      <DashboardQrCodesPage data={qrCodeData} />
  )
}

export default QrCodePage
