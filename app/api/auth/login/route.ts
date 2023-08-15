import { NextResponse } from "next/server"

import { db } from "@/lib/db/api"

export const dynamic = "force-dynamic"

export function withAuthentication(handler) {
  return async (request: Request) => {
    const {
      data: { session },
    } = await db().auth.getSession()

    if (!session) {
      return NextResponse.json({
        status: 401,
        error: "not_authenticated",
        description:
          "The user does not have an active session or is not authenticated",
      })
    }

    return handler(request)
  }
}

// export const POST = withAuthentication(async (request: Request) => {
//   const { email, password } = await request.json()

//   await db().auth.signInWithPassword({
//     email,
//     password,
//   })

//   return NextResponse.json({ status: 200, body: { success: true } })
// })

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const { error } = await db().auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({
      status: 404,
      error,
    })
  }

  return NextResponse.json({ status: 200 })
}
