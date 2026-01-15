export const dynamic = 'force-dynamic'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import DashboardMainPage from "@/components/pages/dashboard-main-page";
import { getDashboardStats } from "@/services/QRCodeServices";


export default async function DashboardPage() {
  const queryClient = new QueryClient()

  try {
    const stats = await queryClient.fetchQuery({
      queryKey: ['getDashboardStats'],
      queryFn: getDashboardStats,
    })

    if (stats?.data?.totalQRCodes?.count === 0) {
      redirect('/dashboard/qr-codes')
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
  }


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardMainPage />
    </HydrationBoundary>

  )
}
