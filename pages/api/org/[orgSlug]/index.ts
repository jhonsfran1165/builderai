import { NextApiRequest, NextApiResponse } from "next"

import {
  withAuthentication,
  withMethods,
  withValidation,
} from "@/lib/api-middlewares"
import { db } from "@/lib/db/api"
import { orgDeleteSchema, orgGetSchema } from "@/lib/validations/org"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "DELETE") {
      const { orgSlug, id } = req.body

      const { error } = await db
        .from("organization")
        .delete()
        .eq("id", id)
        .eq("slug", orgSlug)

      if (error) return res.status(500).json(error)

      return res.status(200).json({ slug: orgSlug })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

const validMethods = ["GET", "DELETE"]

export default withMethods(
  // valid methods for this endpoint
  validMethods,
  // validate payload for this methods
  withValidation(
    {
      GET: orgGetSchema,
      DELETE: orgDeleteSchema,
    },
    withAuthentication(handler, {
      protectedMethods: ["GET", "DELETE"],
      needProfileDetails: true,
    })
  )
)
