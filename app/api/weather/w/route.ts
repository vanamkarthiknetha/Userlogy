import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || 'London'; // Default to 'London' if no city is provided

  try {
    // Fetch weather data from the external API
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${q}`
    );
    // Return the weather data as a JSON response
    return NextResponse.json(await response.json());
  } catch (error) {
    // Handle any errors during the request
    return NextResponse.json(
      { message: 'Failed to fetch weather data', error: error.message },
      { status: 500 }
    );
  }
}
