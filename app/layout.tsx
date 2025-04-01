export const dynamic = "force-dynamic";
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/redux/provider"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar"
import { WebSocketProvider } from "@/components/websocket-provider"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CryptoWeather Nexus",
  description: "Dashboard combining weather data, cryptocurrency information, and real-time notifications",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <WebSocketProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Navbar />
              <main className="container mx-auto px-4 py-8">{children}</main>
            </div>
            <Toaster />
          </WebSocketProvider>
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'