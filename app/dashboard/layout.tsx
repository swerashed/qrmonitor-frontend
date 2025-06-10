import type React from "react"
import type { Metadata } from "next"
import { AppLayout } from "@/components/app-layout"

export const metadata: Metadata = {
  title: "QR Code Generator & Analytics Platform",
  description: "Generate dynamic QR codes and track their performance",
    generator: 'v0.dev'
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
