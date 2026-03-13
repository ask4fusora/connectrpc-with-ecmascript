import { type NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
  const url = request.nextUrl.clone()
  url.pathname = "/1"
  return NextResponse.redirect(url)
}
