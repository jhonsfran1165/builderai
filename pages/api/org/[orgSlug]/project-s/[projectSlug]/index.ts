import { NextApiRequest, NextApiResponse } from "next"

import {
  withAuthentication,
  withMethods,
  withValidation,
} from "@/lib/api-middlewares"
import { db } from "@/lib/db/api"
import { Profile, Session } from "@/lib/types/db"
import { projectGetSchema, projectPostSchema } from "@/lib/validations/project"

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  session?: Session,
  profile?: Profile
) {
  try {
    if (req.method === "GET") {
      const { orgSlug, projectSlug } = req.query

      // TODO: use orgId instead
      const { data: dataProjects, error } = await db
        .from("data_projects")
        .select("*")
        .eq("org_slug", orgSlug)
        .eq("project_slug", projectSlug)
        .single()

      if (error) return res.status(404).json(error)

      return res.status(200).json(dataProjects)
    }

    if (req.method === "POST") {
      const { data, error } = await db
        .from("project")
        .select("*")
        .eq("id", req.body.projectSlug)

      if (error) return res.status(404).json({ ...error })

      return res.status(200).json({ ...data })
    }
  } catch (error) {
    return res.status(500).json({ ...error })
  }
}

const validMethods = ["GET", "POST"]

export default withMethods(
  // valid methods for this endpoint
  validMethods,
  // validate payload for this methods
  withValidation(
    {
      GET: projectGetSchema,
      POST: projectPostSchema,
    },
    // validate session for ["POST", "DELETE", "PUT"] endpoints only
    withAuthentication(handler, {
      protectedMethods: ["POST", "GET"],
      needProfileDetails: true,
    })
  )
)
