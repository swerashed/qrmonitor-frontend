import dynamic from "next/dynamic";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import DashboardMainPage from "@/components/pages/dashboard-main-page";
import { getDashboardStats } from "@/services/QRCodeServices";


export default async function DashboardPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['getDashboardStats'],
    queryFn: getDashboardStats,
  })


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardMainPage />
    </HydrationBoundary>

  )
}
