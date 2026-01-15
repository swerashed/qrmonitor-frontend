import type React from "react"
import type { Metadata } from "next"
import { AppLayout } from "@/components/app-layout"

export const metadata: Metadata = {
  title: "QR Monitor | QR Code Generator & Analytics Platform",
  description: "Generate dynamic QR codes and track their performance",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div >
      <AppLayout>
        {children}
      </AppLayout>

    </div>
  )
}
