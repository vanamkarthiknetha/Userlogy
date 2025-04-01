"use client"

import type React from "react"

import { useEffect } from "react"

// This component simulates WebSocket connections and events
export function WebSocketProvider({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    const tradeWs = new WebSocket('wss://ws.coincap.io/trades/binance')
    tradeWs.onmessage = function (msg) {
      console.log(msg.data)

    }
    const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin')

    pricesWs.onmessage = function (msg) {
      console.log(msg.data)

    }


  }, [])


  return <>{children}</>
}

