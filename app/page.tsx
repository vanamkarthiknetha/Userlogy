import DashboardHeader from "@/components/dashboard-header"
import WeatherSection from "@/components/weather-section"
import CryptoSection from "@/components/crypto-section"
import NewsSection from "@/components/news-section"

export default function Home() {
  return (
    <div className="space-y-8">
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeatherSection />
        <CryptoSection />
      </div>

      <NewsSection />
    </div>
  )
}

