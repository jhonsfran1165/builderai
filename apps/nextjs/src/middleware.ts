import { NextResponse } from "next/server"

import { auth } from "@unprice/auth/server"

import { API_HOSTNAMES, APP_HOSTNAMES } from "@unprice/config"
import { getValidSubdomain, parse } from "~/lib/domains"
import ApiMiddleware from "~/middleware/api"
import AppMiddleware from "~/middleware/app"
import SitesMiddleware from "~/middleware/sites"

export default auth((req) => {
  const { domain } = parse(req)

  // TODO: how to create a new request id per request?
  // req.headers.get("x-request-id") || req.headers.set("x-request-id", newId("request"))

  // 1. we validate api routes
  if (API_HOSTNAMES.has(domain)) {
    return ApiMiddleware(req)
  }

  // 2. we validate app routes inside the dashboard
  if (APP_HOSTNAMES.has(domain)) {
    return AppMiddleware(req)
  }

  const subdomain = getValidSubdomain(domain) ?? ""

  // 3. validate subdomains www and empty
  if (subdomain === "" || subdomain === "www") {
    // public routes under the base domain or www subdomain
    return NextResponse.next()
  }

  // rest of the routes are site routes
  return SitesMiddleware(req)
})

export const config = {
  // matcher: [
  //   /*
  //    * Match all request paths except for the ones starting with:
  //    * - _vercel (Vercel internals)
  //    * - _next (next internals)
  //    * - some-file.extension (static files)
  //    * - api (api routes)
  //    */
  //   "/((?!.+\\.[\\w]+$|_next|api).*)",
  // ],

  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  // TODO: ignore public routes from here
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (special page for OG tags proxying)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt, etc.)
     */
    "/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
}
