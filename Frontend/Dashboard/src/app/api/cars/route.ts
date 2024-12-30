// pages/api/cars/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const car = await request.json();

    if (!car) {
      return new NextResponse(
        JSON.stringify({ body: "No car given!" }),
        { status: 400 }
      );
    }

    const res = await fetch('http://localhost:8080/cars/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });

    if (!res.ok) {
      throw new Error(await res.json());
    }

    const data = await res.json();

    return new NextResponse(
      JSON.stringify(data),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
    try {
        const car = await request.json();
    
        if (!car) {
          return new NextResponse(
            JSON.stringify({ body: "No car given!" }),
            { status: 400 }
          );
        }
    
        const res = await fetch('http://localhost:8080/cars/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(car),
        });
    
        if (!res.ok) {
          throw new Error('Failed to update data');
        }
    
        const data = await res.json();
    
        return new NextResponse(
          JSON.stringify(data),
          { status: 200 }
        );
      } catch (error) {
        console.error(error)
        return new NextResponse(
          JSON.stringify({ error: error.message }),
          { status: 500 }
        );
      }
}
