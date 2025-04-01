"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import Link from "next/link"

export default function DashboardHeader() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const favoriteCities = useSelector((state: RootState) => state.weather.favoriteCities)
  const favoriteCryptos = useSelector((state: RootState) => state.crypto.favoriteCryptos)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">CryptoWeather Nexus</h1>
        <p className="text-muted-foreground">
          {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
        </p>
      </div>

      {(favoriteCities.length > 0 || favoriteCryptos.length > 0) && (
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-medium mb-3">Your Favorites</h2>
            <div className="flex flex-wrap gap-2">
              {favoriteCities.map((cityId) => (
                <Link
                  key={`city-${cityId}`}
                  href={`/city/${cityId}`}
                  className="px-3 py-1 bg-primary/10 hover:bg-primary/20 rounded-full text-sm font-medium"
                >
                  {cityId.charAt(0).toUpperCase() + cityId.slice(1)}
                </Link>
              ))}

              {favoriteCryptos.map((cryptoId) => (
                <Link
                  key={`crypto-${cryptoId}`}
                  href={`/crypto/${cryptoId}`}
                  className="px-3 py-1 bg-secondary/10 hover:bg-secondary/20 rounded-full text-sm font-medium"
                >
                  {cryptoId.charAt(0).toUpperCase() + cryptoId.slice(1)}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

