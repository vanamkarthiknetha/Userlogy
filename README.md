# CryptoWeather Nexus

A web app that combines weather data, cryptocurrency prices, and real-time notifications.

## Features

- **Weather**: Displays temperature, humidity, and conditions for cities (e.g., New York, London, Tokyo).
- **Crypto**: Shows live prices, 24h change, and market cap for Bitcoin, Ethereum, and one other cryptocurrency.
- **News**: Displays the top 5 crypto-related headlines.
- **Real-Time Notifications**: Get notified about significant price changes for Bitcoin and Ethereum.
- **Responsive**: The app adapts to mobile and desktop screens.

## Technologies Used

- **Next.js** (v13+)
- **React** & **Redux** for state management
- **Tailwind CSS** for styling
- **WebSocket** for real-time updates
- **React-Toastify** for notifications

## Setup

1. Clone the repo:
    ```bash
    git clone https://github.com/vanamkarthiknetha/Userlogy.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up API keys in `.env.local`:
    ```
    NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
    NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
    ```
4. Run the app:
    ```bash
    npm run dev
    ```
5. Visit [http://localhost:3000](http://localhost:3000).

## API Integrations

- **Weather**: [WeatherAPI](https://www.weatherapi.com/)
- **Crypto**: [CoinCap](https://www.coincap.io/)
- **News**: [NewsAPI](https://newsapi.org/)

