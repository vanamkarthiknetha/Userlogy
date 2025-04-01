"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, CloudRain, Sun } from "lucide-react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { toggleFavoriteCity,set } from "@/redux/features/weatherSlice"
import type { RootState } from "@/redux/store"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

// Mock weather data
const WEATHER_DATA = [
  {
    id: "new-york",
    name: "New York",
    temp: 18,
    humidity: 65,
    condition: "Partly Cloudy",
    icon: <Cloud className="h-8 w-8" />,
  }
]

export default function WeatherSection() {
  const dispatch = useDispatch()
  const cities = useSelector((state: RootState) => state.weather.cities)
  const favoriteCities = useSelector((state: RootState) => state.weather.favoriteCities)

  const handleToggleFavorite = (cityId: string) => {
    dispatch(toggleFavoriteCity(cityId))
  }
  const fetchWeather = async () => {

    let response ;
    let data= [] ;
    response = await fetch(`/api/weather/w?q=${"Paris"}`)
    data.push(await response.json())
    response = await fetch(`/api/weather/w?q=${"New York"}`)
    data.push(await response.json())
    response = await fetch(`/api/weather/w?q=${"Tokyo"}`)
    data.push(await response.json())
    dispatch(set(data))
  }
  useEffect((
  ) => {
    fetchWeather()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather</CardTitle>
        <CardDescription>Current weather conditions in major cities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cities.map((city) => (
            <div key={city.location.name} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
              <div className="flex items-center gap-4">
                <div>
                  <Link href={`/city/${city.location.name}`} className="font-medium hover:underline">
                    {city.location.name}
                  </Link>
                  <div className="text-sm text-muted-foreground">{city.current.condition.text}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xl font-bold">{city.current.temp_c}°C</div>
                  <div className="text-sm text-muted-foreground">Humidity: {city.current.humidity}%</div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleToggleFavorite(city.location.name)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {favoriteCities.includes(city.location.name) ? "★" : "☆"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

