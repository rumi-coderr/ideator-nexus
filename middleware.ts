import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Basic pass‑through middleware.
  // In production you would verify the Supabase session and enforce RBAC here.
  // For now we simply allow the request to continue.
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/inventory/:path*', '/auth/login'],
}
