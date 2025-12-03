import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    const userCookie = req.cookies.get('user')
    
    if (!userCookie) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],}