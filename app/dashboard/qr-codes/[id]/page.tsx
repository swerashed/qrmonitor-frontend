import { getSingleQRCode } from "@/services/QRCodeServices";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import QrCodeDetailsPage from "@/components/pages/dashboard-qr-details-page";

export default async function SingleQrCodeDetailsPage({ params }: any) {
  const id = (await params).id

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['getSingleQRCode', id],
    queryFn: () => getSingleQRCode(id),
  })


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QrCodeDetailsPage />
    </HydrationBoundary>

  );
}
