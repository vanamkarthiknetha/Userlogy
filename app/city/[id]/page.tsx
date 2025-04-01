"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { toggleFavoriteCity } from "@/redux/features/weatherSlice"
import type { RootState } from "@/redux/store"

// Mock data for city details
const CITY_DATA = {
  "New York": {
    name: "New York",
    country: "United States",
    current: {
      temp: 18,
      humidity: 65,
      condition: "Partly Cloudy",
      windSpeed: 12,
      pressure: 1012,
      feelsLike: 17,
    },
    forecast: [
      { date: "Mon", temp: 18, humidity: 65, condition: "Partly Cloudy" },
      { date: "Tue", temp: 20, humidity: 60, condition: "Sunny" },
      { date: "Wed", temp: 17, humidity: 70, condition: "Rain" },
      { date: "Thu", temp: 16, humidity: 75, condition: "Rain" },
      { date: "Fri", temp: 19, humidity: 65, condition: "Partly Cloudy" },
    ],
    history: [
      { date: "Apr 1", temp: 18 },
      { date: "Mar 31", temp: 17 },
      { date: "Mar 30", temp: 16 },
      { date: "Mar 29", temp: 15 },
      { date: "Mar 28", temp: 14 },
      { date: "Mar 27", temp: 16 },
      { date: "Mar 26", temp: 18 },
    ],
  
  },
  London: {
    name: "London",
    country: "United Kingdom",
    current: {
      temp: 14,
      humidity: 75,
      condition: "Rainy",
      windSpeed: 15,
      pressure: 1008,
      feelsLike: 12,
    },
    forecast: [
      { date: "Mon", temp: 14, humidity: 75, condition: "Rainy" },
      { date: "Tue", temp: 15, humidity: 70, condition: "Cloudy" },
      { date: "Wed", temp: 16, humidity: 65, condition: "Partly Cloudy" },
      { date: "Thu", temp: 17, humidity: 60, condition: "Sunny" },
      { date: "Fri", temp: 16, humidity: 65, condition: "Partly Cloudy" },
    ],
    history: [
      { date: "Apr 1", temp: 14 },
      { date: "Mar 31", temp: 13 },
      { date: "Mar 30", temp: 12 },
      { date: "Mar 29", temp: 14 },
      { date: "Mar 28", temp: 15 },
      { date: "Mar 27", temp: 13 },
      { date: "Mar 26", temp: 12 },
    ],
  },
  Tokyo: {
    name: "Tokyo",
    country: "Japan",
    current: {
      temp: 22,
      humidity: 55,
      condition: "Sunny",
      windSpeed: 8,
      pressure: 1015,
      feelsLike: 23,
    },
    forecast: [
      { date: "Mon", temp: 22, humidity: 55, condition: "Sunny" },
      { date: "Tue", temp: 23, humidity: 50, condition: "Sunny" },
      { date: "Wed", temp: 24, humidity: 45, condition: "Sunny" },
      { date: "Thu", temp: 22, humidity: 60, condition: "Partly Cloudy" },
      { date: "Fri", temp: 21, humidity: 65, condition: "Cloudy" },
    ],
    history: [
      { date: "Apr 1", temp: 22 },
      { date: "Mar 31", temp: 21 },
      { date: "Mar 30", temp: 20 },
      { date: "Mar 29", temp: 22 },
      { date: "Mar 28", temp: 23 },
      { date: "Mar 27", temp: 21 },
      { date: "Mar 26", temp: 20 },
    ],
  },
}

export default function CityPage() {
  const params = useParams()
  const cityId = params.id as string
  const [cityData, setCityData] = useState<any>(null)

  const dispatch = useDispatch()
  const favoriteCities = useSelector((state: RootState) => state.weather.favoriteCities)
  const isFavorite = favoriteCities.includes(cityId)


  useEffect(() => {
    // In a real app, this would be an API call
    setCityData(CITY_DATA[cityId as keyof typeof CITY_DATA] || null)
  }, [cityId])

  if (!cityData) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-xl">City not found</p>
      </div>
    )
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteCity(cityId))
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
          <h1 className="text-3xl font-bold">{cityData.name}</h1>
          <span className="text-muted-foreground">{cityData.country}</span>
        </div>
        <Button variant={isFavorite ? "default" : "outline"} onClick={handleToggleFavorite}>
          {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Weather</CardTitle>
          <CardDescription>Updated as of {new Date().toLocaleTimeString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
              <span className="text-4xl font-bold">{cityData.current.temp}°C</span>
              <span className="text-muted-foreground">Feels like {cityData.current.feelsLike}°C</span>
              <span className="mt-2 text-lg">{cityData.current.condition}</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Humidity</span>
                <span>{cityData.current.humidity}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Wind Speed</span>
                <span>{cityData.current.windSpeed} km/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pressure</span>
                <span>{cityData.current.pressure} hPa</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">5-Day Forecast</h3>
              <div className="grid grid-cols-5 gap-2">
                {cityData.forecast.map((day: any, index: number) => (
                  <div key={index} className="flex flex-col items-center p-2 bg-primary/5 rounded-lg">
                    <span className="text-sm font-medium">{day.date}</span>
                    <span className="text-lg font-bold">{day.temp}°C</span>
                    <span className="text-xs text-muted-foreground">{day.condition}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="chart">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chart">Temperature Chart</TabsTrigger>
          <TabsTrigger value="table">Historical Data</TabsTrigger>
        </TabsList>
        <TabsContent value="chart" className="p-4 border rounded-lg mt-2">
          <h3 className="text-lg font-medium mb-4">7-Day Temperature History</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cityData.history} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        <TabsContent value="table" className="p-4 border rounded-lg mt-2">
          <h3 className="text-lg font-medium mb-4">Historical Weather Data</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Temperature (°C)</th>
                </tr>
              </thead>
              <tbody>
                {cityData.history.map((day: any, index: number) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{day.date}</td>
                    <td className="p-2">{day.temp}°C</td>
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

