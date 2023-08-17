import { NextApiRequest, NextApiResponse } from "next"
import { v4 as uuidv4 } from "uuid"

import {
  withAuthentication,
  withMethods,
  withValidation,
} from "@/lib/api-middlewares"
import { db as adminDB } from "@/lib/db/admin"
import { db } from "@/lib/db/api"
import { Session } from "@/lib/types/db"
import { orgPostSchema, orgPutSchema } from "@/lib/validations/org"

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  session?: Session
) {
  try {
    if (req.method === "PUT") {
      const { id, type, name, image, description } = req.body

      const { data: org, error } = await db()
        .from("organization")
        .update({
          type,
          name,
          image,
          description,
        })
        .match({ id }) // match by id
        .select()
        .single()

      if (error) return res.status(500).json(error)

      return res.status(200).json(org)
    }

    if (req.method === "POST") {
      const { slug, type, name, image, description } = req.body
      const uuid = uuidv4()

      // we use here admin db to bypass all RLS
      const { error } = await adminDB.rpc("config_org", {
        user_id: session?.user.id ?? "",
        org_id: uuid,
        slug,
        type: type?.toUpperCase(),
        name,
        image,
        description,
        role_user: "OWNER",
      })

      if (error) return res.status(500).json(error)

      return res.status(200).json({ slug: slug })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

const validMethods = ["POST", "PUT"]

export default withMethods(
  // valid methods for this endpoint
  validMethods,
  // validate payload for this methods
  withValidation(
    {
      POST: orgPostSchema,
      PUT: orgPutSchema,
    },
    // validate session for ["POST", "DELETE", "PUT"] endpoints only
    withAuthentication(handler, {
      protectedMethods: ["POST", "PUT"],
      needProfileDetails: true,
    })
  )
)
