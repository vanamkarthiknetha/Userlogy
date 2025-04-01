"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"

export default function Navbar() {
  const [ theme, setTheme ] = useState("dark")
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const notifications = useSelector((state: RootState) => state.notifications.notifications)
  
  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark')?"dark":"")
    setMounted(true)
  }, [])
  
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setTheme(document.documentElement.classList.contains('dark')?"dark":"")
  }

  const showNotifications = () => {
    if (notifications.length === 0) {
      toast({
        title: "No notifications",
        description: "You don't have any notifications at the moment.",
      })
      return
    }

    // Show the most recent notification
    const latestNotification = notifications[notifications.length - 1]
    toast({
      title: latestNotification.title,
      description: latestNotification.message,
      variant: latestNotification.type === "price_alert" ? "default" : "destructive",
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">CryptoWeather</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={showNotifications} className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              {notifications.length > 0 && <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />}
            </Button>
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

