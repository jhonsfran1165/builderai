import { NextResponse, type NextRequest } from "next/server"
import { v4 as uuidv4 } from "uuid"

import { db as dbAdmin } from "@/lib/db/admin"
import { db } from "@/lib/db/api"

// GET responses are cached by default
export async function POST(request: NextRequest) {
  const { slug, type, name, image, description } = await request.json()
  const uuid = uuidv4()

  const {
    data: { session },
  } = await db().auth.getSession()

  // we use here admin db to bypass all RLS
  const { error } = await dbAdmin.rpc("config_org", {
    user_id: session?.user.id ?? "",
    org_id: uuid,
    slug,
    type: type?.toUpperCase(),
    name,
    image,
    description,
    role_user: "OWNER",
  })

  if (error) return NextResponse.json(error, { status: 500 })

  return NextResponse.json(slug, { status: 200 })
}
