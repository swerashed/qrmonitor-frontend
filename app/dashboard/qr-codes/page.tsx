import DashboardQrCodesPage from '@/components/pages/dashboard-qr-code-page'
import { getAllQRCode } from '@/services/QRCodeServices'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

const QrCodePage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['getAllQRCode'],
    queryFn: getAllQRCode,
  })


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardQrCodesPage />
    </HydrationBoundary>

  )
}

export default QrCodePage
