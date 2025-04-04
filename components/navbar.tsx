"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function Navbar() {
  const [theme, setTheme] = useState("dark")
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [coin, setCoin] = useState({})

  useEffect(() => {
    const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin')

    pricesWs.onmessage = function (msg) {
      setCoin(JSON.parse(msg.data))
    }
    return () => {
      pricesWs.close()
    }
  }, [])

  useEffect(() => {

    setTheme(document.documentElement.classList.contains('dark') ? "dark" : "")
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setTheme(document.documentElement.classList.contains('dark') ? "dark" : "")
  }



  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl hidden md:block">CryptoWeather</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <Button variant="outline">
              Realtime {'=>'}
              <span className="text-green-300">
               {Object.keys(coin).length > 0
                ? `${Object.keys(coin)[0]}: ${coin[Object.keys(coin)[0]]}`
                : "Loading..."}

              </span>
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

