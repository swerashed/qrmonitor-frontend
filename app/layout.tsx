import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

import "./globals.css"
import ReactQueryProviders from "@/providers/react-query-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QR Code Generator & Analytics Platform",
  description: "Generate dynamic QR codes and track their performance",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider storageKey="my-app-theme"
          themes={["light", "dark"]}
          attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ReactQueryProviders>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
          </ReactQueryProviders>
        </ThemeProvider>
      </body>
    </html>
  )
}
