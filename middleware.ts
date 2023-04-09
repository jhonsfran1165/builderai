import { NextFetchEvent, NextResponse, type NextRequest } from "next/server"

import {
  DEFAULT_REDIRECTS,
  HOME_HOSTNAMES,
  RESERVED_KEYS,
} from "@/lib/constants"
import {
  ApiMiddleware,
  AppMiddleware,
  // LinkMiddleware,
  SitesMiddleware,
} from "@/lib/middleware"
import { parse } from "@/lib/middleware/utils"
import type { Database } from "@/lib/types/database.types"

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/, /_auth/ (special pages for OG tags proxying, password protection)
     * 4. root/ app directory
     * 5. sites/ sites directory
     * 6. /_static (inside /public)
     * 7. /_vercel (Vercel internals)
     * 8. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_proxy/|_auth/|root/|sites/|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
}

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { domain, path, key } = parse(req)

  const home = HOME_HOSTNAMES.has(domain ?? "")

  // 1. validate sites
  // 2. validate app and session of protected routes
  // 3. validate analytics

  if (
    domain === "builderai.io" ||
    domain === "builderai.vercel.app" ||
    domain === "app.localhost:3000" ||
    domain?.endsWith("jhonsfran.vercel.app")
  ) {
    return AppMiddleware(req)
  }

  if (
    domain === "api.builderai.vercel.app" ||
    domain === "api.localhost:3000"
  ) {
    return ApiMiddleware(req)
  }

  if (key.length === 0) {
    return SitesMiddleware(req, ev)
  }

  if (home) {
    if (path.startsWith("/static")) {
      return NextResponse.rewrite(
        new URL("/_static" + path.split("/static")[1], req.url)
      )
    }
    if (DEFAULT_REDIRECTS[key]) {
      return NextResponse.redirect(DEFAULT_REDIRECTS[key])
    }
    if (RESERVED_KEYS.has(key)) {
      return NextResponse.next()
    }
  }

  // Create middleware for pages
  // return LinkMiddleware(req, ev);
}
