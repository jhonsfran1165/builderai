import { NextResponse, type NextRequest } from "next/server"

import { db } from "@/lib/db/api"

// GET responses are cached by default
export async function GET(
  req: NextRequest,
  { params: { orgSlug } }: { params: { orgSlug: string } }
) {
  const { data: dataProjects, error } = await db()
    .from("data_projects")
    .select("*")
    .eq("org_slug", orgSlug)

  if (error) return NextResponse.json({ status: 404 })

  return NextResponse.json(dataProjects, { status: 200 })
}

// export default withValidation(
//   {
//     GET: projectGetSchema,
//     POST: projectPostSchema,
//   },
//   // validate session for ["POST", "DELETE", "PUT"] endpoints only
//   withAuthentication(handler, {
//     protectedMethods: ["POST", "GET"],
//     needProfileDetails: true,
//   })
// )
