import { NextResponse } from "next/server"

import { db } from "@/lib/db/api"

export const dynamic = "force-dynamic"

export async function POST(request) {
  const requestUrl = new URL(request.url)
  const data = await request.json()

  const { error } = await db().auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
    },
  })

  console.log(error)

  if (error) {
    return NextResponse.json({ status: 500, error })
  }

  return NextResponse.json({ status: 200, body: { success: true } })
}
