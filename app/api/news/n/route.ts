import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    );
    return NextResponse.json(await response.json());
  } catch (error) {
    // Handle any errors during the request
    return NextResponse.json(
      { message: 'Failed to fetch weather data', error: error.message },
      { status: 500 }
    );
  }
}
