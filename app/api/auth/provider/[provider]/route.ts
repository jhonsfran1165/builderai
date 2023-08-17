import { NextRequest, NextResponse } from "next/server"

import { db } from "@/lib/db/api"

export const dynamic = "force-dynamic"

export async function POST(
  request: NextRequest,
  { params: { provider } }: { params: { provider: string } }
) {
  const requestUrl = new URL(request.url)
  // TODO: validate parameters
  const data = await request.json()
  let response = {}

  if (provider === "magic") {
    response = await db().auth.signInWithOtp({
      email: data.email,
      options: {
        emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
      },
    })
  } else if (provider === "github") {
    response = await db().auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${requestUrl.origin}/api/auth/callback`,
      },
    })
  } else {
    return NextResponse.json({ status: 500, error: "Invalid provider" })
  }

  return NextResponse.json({ status: 200, ...response })
}
