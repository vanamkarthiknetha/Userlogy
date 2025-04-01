"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { toggleFavoriteCrypto, set } from "@/redux/features/cryptoSlice"
import type { RootState } from "@/redux/store"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

// Mock crypto data
const CRYPTO_DATA = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 64235.78,
    change24h: 2.34,
    marketCap: 1258000000000,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 3245.67,
    change24h: -1.23,
    marketCap: 389000000000,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 145.78,
    change24h: 5.67,
    marketCap: 63500000000,
  },
]

export default function CryptoSection() {
  const dispatch = useDispatch()
  const cryptos = useSelector((state: RootState) => state.crypto.cryptos)
  const favoriteCryptos = useSelector((state: RootState) => state.crypto.favoriteCryptos)

  const handleToggleFavorite = (cryptoId: string) => {
    dispatch(toggleFavoriteCrypto(cryptoId))
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num)
  }

  const formatMarketCap = (num: number) => {
    if (num >= 1000000000000) {
      return `$${(num / 1000000000000).toFixed(2)}T`
    }
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`
    }
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`
    }
    return formatCurrency(num)
  }

  const fetchCrypto = async () => {
    let response;
    let data = [];
    response = await fetch(`/api/crypto/c?q=${"bitcoin"}`)
    data.push(await response.json())
    response = await fetch(`/api/crypto/c?q=${"ethereum"}`)
    data.push(await response.json())
    response = await fetch(`/api/crypto/c?q=${"solana"}`)
    data.push(await response.json())
    dispatch(set(data))
  }
  useEffect((
  ) => {
    fetchCrypto()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cryptocurrency</CardTitle>
        <CardDescription>Live prices and market data</CardDescription>
      </CardHeader>
      <CardContent>
        {
          cryptos.length === 0 && <p>Loading...</p>
        }
        <div className="space-y-4">
          {cryptos.map(({ data: crypto }) => (
            <div key={crypto.name} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
              <div className="flex items-center gap-4">
                <div>
                  <Link href={`/crypto/${crypto.id}`} className="font-medium hover:underline">
                    {crypto.name}
                  </Link>
                  <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xl font-bold">{formatCurrency(crypto.priceUsd)}</div>
                  <div
                    className={`flex items-center justify-end text-sm ${crypto.changePercent24Hr >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {crypto.changePercent24Hr >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    <span>{Number(crypto.changePercent24Hr).toFixed(2)}%</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleToggleFavorite(crypto.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {favoriteCryptos.includes(crypto.id) ? "★" : "☆"}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Market Cap: {formatMarketCap(CRYPTO_DATA[0].marketCap)} (BTC)</p>
        </div>
      </CardContent>
    </Card>
  )
}

