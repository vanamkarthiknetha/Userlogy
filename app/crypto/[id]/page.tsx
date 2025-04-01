"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowLeft, TrendingDown, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { toggleFavoriteCrypto } from "@/redux/features/cryptoSlice"
import type { RootState } from "@/redux/store"

// Mock data for crypto details
const CRYPTO_DATA = {
  bitcoin: {
    name: "Bitcoin",
    symbol: "BTC",
    current: {
      price: 64235.78,
      marketCap: 1258000000000,
      volume24h: 32500000000,
      change24h: 2.34,
      high24h: 65100.25,
      low24h: 63200.5,
    },
    history: [
      { date: "Apr 1", price: 64235.78 },
      { date: "Mar 31", price: 62768.45 },
      { date: "Mar 30", price: 61987.23 },
      { date: "Mar 29", price: 63452.18 },
      { date: "Mar 28", price: 64123.56 },
      { date: "Mar 27", price: 63789.12 },
      { date: "Mar 26", price: 62345.67 },
    ],
    metrics: {
      circulatingSupply: 19456789,
      totalSupply: 21000000,
      allTimeHigh: 69000,
      allTimeHighDate: "Nov 10, 2021",
    },
  },
  ethereum: {
    name: "Ethereum",
    symbol: "ETH",
    current: {
      price: 3245.67,
      marketCap: 389000000000,
      volume24h: 15700000000,
      change24h: -1.23,
      high24h: 3300.12,
      low24h: 3200.45,
    },
    history: [
      { date: "Apr 1", price: 3245.67 },
      { date: "Mar 31", price: 3289.45 },
      { date: "Mar 30", price: 3312.23 },
      { date: "Mar 29", price: 3278.18 },
      { date: "Mar 28", price: 3245.56 },
      { date: "Mar 27", price: 3267.12 },
      { date: "Mar 26", price: 3289.67 },
    ],
    metrics: {
      circulatingSupply: 120456789,
      totalSupply: null,
      allTimeHigh: 4878.26,
      allTimeHighDate: "Nov 10, 2021",
    },
  },
  solana: {
    name: "Solana",
    symbol: "SOL",
    current: {
      price: 145.78,
      marketCap: 63500000000,
      volume24h: 2800000000,
      change24h: 5.67,
      high24h: 148.25,
      low24h: 138.5,
    },
    history: [
      { date: "Apr 1", price: 145.78 },
      { date: "Mar 31", price: 137.45 },
      { date: "Mar 30", price: 132.23 },
      { date: "Mar 29", price: 128.18 },
      { date: "Mar 28", price: 130.56 },
      { date: "Mar 27", price: 135.12 },
      { date: "Mar 26", price: 132.67 },
    ],
    metrics: {
      circulatingSupply: 436789123,
      totalSupply: 535000000,
      allTimeHigh: 260.06,
      allTimeHighDate: "Nov 6, 2021",
    },
  },
}

export default function CryptoPage() {
  const params = useParams()
  const cryptoId = params.id as string
  const [cryptoData, setCryptoData] = useState<any>(null)

  const dispatch = useDispatch()
  const favoriteCryptos = useSelector((state: RootState) => state.crypto.favoriteCryptos)
  const isFavorite = favoriteCryptos.includes(cryptoId)

  useEffect(() => {
    // In a real app, this would be an API call
    setCryptoData(CRYPTO_DATA[cryptoId as keyof typeof CRYPTO_DATA] || null)
  }, [cryptoId])

  if (!cryptoData) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-xl">Cryptocurrency not found</p>
      </div>
    )
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteCrypto(cryptoId))
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{cryptoData.name}</h1>
          <span className="text-muted-foreground">{cryptoData.symbol}</span>
        </div>
        <Button variant={isFavorite ? "default" : "outline"} onClick={handleToggleFavorite}>
          {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Price</CardTitle>
          <CardDescription>Updated as of {new Date().toLocaleTimeString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
              <span className="text-4xl font-bold">{formatCurrency(cryptoData.current.price)}</span>
              <div
                className={`flex items-center mt-2 ${cryptoData.current.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {cryptoData.current.change24h >= 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span>{cryptoData.current.change24h.toFixed(2)}%</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Market Cap</span>
                <span>{formatMarketCap(cryptoData.current.marketCap)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">24h Volume</span>
                <span>{formatMarketCap(cryptoData.current.volume24h)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">24h High</span>
                <span>{formatCurrency(cryptoData.current.high24h)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">24h Low</span>
                <span>{formatCurrency(cryptoData.current.low24h)}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Circulating Supply</span>
                <span>
                  {formatNumber(cryptoData.metrics.circulatingSupply)} {cryptoData.symbol}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Supply</span>
                <span>
                  {cryptoData.metrics.totalSupply ? formatNumber(cryptoData.metrics.totalSupply) : "Unlimited"}{" "}
                  {cryptoData.symbol}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">All Time High</span>
                <span>{formatCurrency(cryptoData.metrics.allTimeHigh)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ATH Date</span>
                <span>{cryptoData.metrics.allTimeHighDate}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="chart">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chart">Price Chart</TabsTrigger>
          <TabsTrigger value="table">Historical Data</TabsTrigger>
        </TabsList>
        <TabsContent value="chart" className="p-4 border rounded-lg mt-2">
          <h3 className="text-lg font-medium mb-4">7-Day Price History</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cryptoData.history} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip formatter={(value) => [`${formatCurrency(value)}`, "Price"]} />
                <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        <TabsContent value="table" className="p-4 border rounded-lg mt-2">
          <h3 className="text-lg font-medium mb-4">Historical Price Data</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {cryptoData.history.map((day: any, index: number) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{day.date}</td>
                    <td className="p-2">{formatCurrency(day.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

