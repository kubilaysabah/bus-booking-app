import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function POST(request: NextRequest) {
    const data = request.body
    console.log("body", data);
    return NextResponse.redirect(new URL('/home', request.url))
}