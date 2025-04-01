"use client"

import type React from "react"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addNotification } from "@/redux/features/notificationsSlice"
import { updateCryptoPrice } from "@/redux/features/cryptoSlice"
import { useToast } from "@/components/ui/use-toast"

// This component simulates WebSocket connections and events
export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()
  const { toast } = useToast()

  useEffect(() => {
    // Simulate WebSocket connection for crypto price updates
    console.log("Establishing simulated WebSocket connections...")

    // Simulate receiving crypto price updates
    const cryptoInterval = setInterval(() => {
      const cryptos = ["bitcoin", "ethereum", "solana"]
      const randomCrypto = cryptos[Math.floor(Math.random() * cryptos.length)]
      const priceChange = (Math.random() * 2 - 1) * 100 // Random value between -100 and 100

      // Only create notifications for significant price changes (>2%)
      if (Math.abs(priceChange) > 2) {
        const direction = priceChange > 0 ? "up" : "down"
        dispatch(
          addNotification({
            id: Date.now().toString(),
            type: "price_alert",
            title: `${randomCrypto.charAt(0).toUpperCase() + randomCrypto.slice(1)} Price Alert`,
            message: `${randomCrypto.charAt(0).toUpperCase() + randomCrypto.slice(1)} price has moved ${direction} by ${Math.abs(priceChange).toFixed(2)}%`,
            timestamp: new Date().toISOString(),
          }),
        )

        // Show toast for significant price changes
        toast({
          title: `${randomCrypto.charAt(0).toUpperCase() + randomCrypto.slice(1)} Price Alert`,
          description: `Price has moved ${direction} by ${Math.abs(priceChange).toFixed(2)}%`,
        })
      }

      // Update crypto price in Redux store
      dispatch(
        updateCryptoPrice({
          id: randomCrypto,
          priceChange: priceChange,
        }),
      )
    }, 30000) // Every 30 seconds

    // Simulate receiving weather alerts
    const weatherInterval = setInterval(() => {
      const cities = ["new-york", "london", "tokyo"]
      const randomCity = cities[Math.floor(Math.random() * cities.length)]
      const weatherEvents = [
        "Heavy rainfall expected",
        "Temperature dropping rapidly",
        "Strong winds advisory",
        "Heat wave warning",
        "Thunderstorm approaching",
      ]
      const randomEvent = weatherEvents[Math.floor(Math.random() * weatherEvents.length)]

      // Only create weather alerts occasionally (20% chance)
      if (Math.random() < 0.2) {
        dispatch(
          addNotification({
            id: Date.now().toString(),
            type: "weather_alert",
            title: `Weather Alert: ${randomCity.charAt(0).toUpperCase() + randomCity.slice(1)}`,
            message: randomEvent,
            timestamp: new Date().toISOString(),
          }),
        )

        // Show toast for weather alerts
        toast({
          title: `Weather Alert: ${randomCity.charAt(0).toUpperCase() + randomCity.slice(1)}`,
          description: randomEvent,
          variant: "destructive",
        })
      }
    }, 60000) // Every 60 seconds

    return () => {
      clearInterval(cryptoInterval)
      clearInterval(weatherInterval)
      console.log("Closing simulated WebSocket connections...")
    }
  }, [dispatch, toast])

  return <>{children}</>
}

