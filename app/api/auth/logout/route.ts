import { NextResponse } from "next/server"

import { db } from "@/lib/db/api"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const { error } = await db().auth.signOut()

  if (error) {
    return NextResponse.json({
      status: 404,
      error,
    })
  }

  return NextResponse.json({ status: 200 })
}
