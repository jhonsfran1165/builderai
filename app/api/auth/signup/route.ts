import { NextResponse } from "next/server"

import { db } from "@/lib/db/api"

export const dynamic = "force-dynamic"

export async function POST(request) {
  const requestUrl = new URL(request.url)
  // TODO: validate parameters
  const data = await request.json()

  console.log(data)

  if (data.provider === "email") {
    await db().auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      },
    })
  } else if (data.provider === "magic") {
    await db().auth.signInWithOtp({
      email: data.email,
      options: {
        emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      },
    })
  } else if (data.provider === "github") {
    const github = await db().auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${requestUrl.origin}/auth/callback`,
      },
    })
  } else {
    return NextResponse.json({ status: 500, error: "Invalid provider" })
  }

  return NextResponse.json({ status: 200, body: { success: true } })
}
