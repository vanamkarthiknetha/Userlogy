"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"

// Mock news data
const NEWS_DATA = [
  {
    id: 1,
    title: "Bitcoin Surges Past $64,000 as Institutional Adoption Grows",
    source: "CryptoNews",
    date: "April 1, 2025",
    url: "#",
  },
  {
    id: 2,
    title: "Ethereum Developers Announce Major Protocol Upgrade Timeline",
    source: "BlockchainToday",
    date: "April 1, 2025",
    url: "#",
  },
  {
    id: 3,
    title: "Severe Weather Patterns Affecting Crypto Mining Operations in Northern Regions",
    source: "TechWeather",
    date: "March 31, 2025",
    url: "#",
  },
  {
    id: 4,
    title: "New Regulatory Framework for Cryptocurrencies Proposed by G20 Nations",
    source: "FinanceDaily",
    date: "March 31, 2025",
    url: "#",
  },
  {
    id: 5,
    title: "Climate Change Impact on Global Energy Consumption and Crypto Mining",
    source: "EcoTech",
    date: "March 30, 2025",
    url: "#",
  },
]

export default function NewsSection() {
  const [news, setnews] = useState([])

  const fetchNews = async () => {
  
      let response ;
      response = await fetch(`/api/news/n`)
      const data=await response.json()
      console.log(data)
      setnews(data.articles.slice(0,4))
    }
    useEffect((
    ) => {
      fetchNews()
    }, [])
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest News</CardTitle>
        <CardDescription>Top crypto and weather-related headlines</CardDescription>
      </CardHeader>
      <CardContent>
      {
          news.length === 0 && <p>Loading...</p>
        }
        <div className="space-y-4">
          {news.map((news) => (
            <div key={news.title} className="border-b pb-3 last:border-0 last:pb-0">
              <Link href={news.url} target="_blank" className="font-medium hover:underline">
                {news.title}
              </Link>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <span>{news.source.name}</span>
                <span>•</span>
                <span>{news.publishedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

