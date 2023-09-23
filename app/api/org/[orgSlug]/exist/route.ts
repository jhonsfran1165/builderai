import { NextResponse, type NextRequest } from "next/server"

import { authTxn, eq } from "@/lib/db"
import { organizations } from "@/lib/db/schemas/organizations"

// GET responses are cached by default
export async function GET(
  req: NextRequest,
  { params: { orgSlug } }: { params: { orgSlug: string } }
) {
  const data = await authTxn((db) => {
    return db
      .select({
        slug: organizations.slug,
      })
      .from(organizations)
      .where(eq(organizations.slug, orgSlug))
      .limit(1)
  })

  return NextResponse.json(data, { status: 200 })
}
