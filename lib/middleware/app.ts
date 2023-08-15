import { NextFetchEvent, NextRequest, NextResponse } from "next/server"

import { parse } from "@/lib/middleware/utils"

import { db as dbClient } from "../db/middleware"

export default async function AppMiddleware(
  req: NextRequest,
  ev: NextFetchEvent
) {
  const { path } = parse(req)
  const res = NextResponse.next()
  const url = req.nextUrl
  const db = dbClient({ req, res })

  const {
    data: { session },
  } = await db.auth.getSession()

  // TODO: recording page hits

  if (!session?.user?.email && !["/login", "/register"].includes(path)) {
    url.pathname = "/login"
    return NextResponse.redirect(url)
  } else if (session?.user?.email && ["/login", "/register"].includes(path)) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  url.pathname = `/root${path === "/" ? "" : path}`

  return NextResponse.rewrite(url)
}
