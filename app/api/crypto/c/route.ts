import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || 'Bitcoin'; 

  try {
    const response = await fetch(
      `https://api.coincap.io/v2/assets/${q}`
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
