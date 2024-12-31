// pages/api/cars/route.ts
import { SERVER_URL } from '@/app/constants/consts';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const reqUrl = request.nextUrl.searchParams.get('link')

    if (!reqUrl) throw new Error("No link provided!")
    
    const decodedUrl = decodeURIComponent(reqUrl)

    const res = await fetch(decodedUrl);

    if (!res.ok) {
      throw new Error((await res.json()).error);
    }

    const data = await res.json();

    return new NextResponse(
      JSON.stringify(data),
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.message)
    return new NextResponse(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const car = await request.json();

    if (!car) {
      return new NextResponse(
        JSON.stringify({ body: "No car given!" }),
        { status: 400 }
      );
    }

    const res = await fetch(`${SERVER_URL}/cars/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });

    if (!res.ok) {
      throw new Error((await res.json()).error);
    }

    const data = await res.json();

    return new NextResponse(
      JSON.stringify(data),
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.message)
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
    
        const res = await fetch(`${SERVER_URL}/cars/update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(car),
        });
    
        if (!res.ok) {
          throw new Error((await res.json()).error);
        }
    
        const data = await res.json();
    
        return new NextResponse(
          JSON.stringify(data),
          { status: 200 }
        );
      } catch (error: any) {
        console.error(error.message)
        return new NextResponse(
          JSON.stringify({ error: error.message }),
          { status: 500 }
        );
      }
}

export async function DELETE(request: NextRequest) {
  try {
    const car = await request.json();

    if (!car) {
      return new NextResponse(
        JSON.stringify({ body: "No car given!" }),
        { status: 400 }
      );
    }

    const res = await fetch(`${SERVER_URL}/cars/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });

    if (!res.ok) {
      throw new Error((await res.json()).error);
    }

    const data = await res.json();

    return new NextResponse(
      JSON.stringify(data),
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.message)
    return new NextResponse(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
